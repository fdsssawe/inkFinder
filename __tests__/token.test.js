import { asValue, createContainer } from 'awilix';
import { TokenService } from '../services/TokenService';
import Token from '../model/Token';
import LogObserver from '../middlewares/LogObserver';

jest.mock('../model/Token'); 
jest.mock('../middlewares/LogObserver'); 

describe('TokenService', () => {
    let tokenServiceContainer;
    let tokenService;
    let logObserver;

    beforeEach(() => {
        logObserver = new LogObserver();
        tokenService = new TokenService();
        tokenService.attach(logObserver);
        tokenServiceContainer = createContainer();
        tokenServiceContainer.register({ tokenService: asValue(tokenService) });
    });

    test('should find token', async () => {
        const mockToken = { refreshToken: 'test-token' };
        Token.findOne.mockResolvedValue(mockToken);

        const service = tokenServiceContainer.resolve("tokenService");
        const tokenData = await service.findToken('test-token');

        expect(tokenData).toEqual(mockToken);
        expect(Token.findOne).toHaveBeenCalledWith({ refreshToken: 'test-token' });
    });

    test('should notify observers when token is validated', async () => {
        const logObserverUpdateSpy = jest.spyOn(logObserver, 'update');
    
        const service = tokenServiceContainer.resolve("tokenService");
        await service.validateRefreshToken('test-token');
    
        expect(logObserverUpdateSpy).toHaveBeenCalledWith('test-token');
    });
});
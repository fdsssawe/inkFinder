import AuthService from '../client/csletmelearn/src/services/AuthService';
import api from '../client/csletmelearn/src/http';

jest.mock('../client/csletmelearn/src/http');

describe('AuthService', () => {
    let authService;

    beforeEach(() => {
        authService = new AuthService();
    });

    it('should execute login command', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const response = { data: 'test' };
        api.post.mockResolvedValue(response);

        const result = await authService.executeCommand('login', email, password);

        expect(api.post).toHaveBeenCalledWith('/login', { email, password });
        expect(result).toEqual(response);
    });

    it('should execute registration command', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const response = { data: 'test' };
        api.post.mockResolvedValue(response);

        const result = await authService.executeCommand('registration', email, password);

        expect(api.post).toHaveBeenCalledWith('/registration', { email, password });
        expect(result).toEqual(response);
    });

    it('should execute logout command', async () => {
        const response = { data: 'test' };
        api.post.mockResolvedValue(response);

        const result = await authService.executeCommand('logout');

        expect(api.post).toHaveBeenCalledWith('/logout');
        expect(result).toEqual(response);
    });

    it('should execute googleAuthHandle command', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const response = { data: true };
        api.post.mockResolvedValueOnce(response);
        api.post.mockResolvedValueOnce({ data: 'test' });

        const result = await authService.executeCommand('googleAuthHandle', email, password);

        expect(api.post).toHaveBeenCalledWith('/isuser', { email });
        expect(api.post).toHaveBeenCalledWith('/login', { email, password });
        expect(result).toEqual({ response: { data: 'test' }, job: 'login' });
    });

});
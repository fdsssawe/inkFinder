import { createContainer, asValue } from 'awilix';
import mailServiceContainer from '../services/MailService';
import { MailFactory, ActivationMailService, ResetPasswordMailService } from '../services/MailService';

describe('MailFactory', () => {
    let mailServiceContainer;
    let mailService;

    beforeEach(() => {
        mailServiceContainer = createContainer();
        mailService = new MailFactory();
        mailServiceContainer.register({ mailService: asValue(mailService) });
    });

    test('should create ActivationMailService', () => {
        const service = mailServiceContainer.resolve("mailService").createMail('activation', 'test@example.com', 'test-link');
        expect(service).toBeInstanceOf(ActivationMailService);
        expect(service.to).toBe('test@example.com');
        expect(service.link).toBe('test-link');
    });

    test('should create ResetPasswordMailService', () => {
        const service = mailServiceContainer.resolve("mailService").createMail('reset', 'test@example.com', 'test-link');
        expect(service).toBeInstanceOf(ResetPasswordMailService);
        expect(service.to).toBe('test@example.com');
        expect(service.link).toBe('test-link');
    });

    test('should throw error for invalid mail type', () => {
        expect(() => mailServiceContainer.resolve("mailService").createMail('invalid', 'test@example.com', 'test-link')).toThrow('Invalid mail type');
    });
});
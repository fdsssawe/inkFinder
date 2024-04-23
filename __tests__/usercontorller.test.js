import { createContainer, asValue } from 'awilix';
import { UserController, UserControllerWithLogging } from '../controllers/UserController';

describe('UserController', () => {
    let userControllerContainer;
    let userController;
    let userControllerAuthed;

    beforeEach(() => {
        userControllerContainer = createContainer();
        userController = new UserController();
        userControllerAuthed = new UserControllerWithLogging();
        userControllerContainer.register({ userController: asValue(userController) });
        userControllerContainer.register({ userControllerAuthed: asValue(userControllerAuthed) });
    });

    test('should create UserController', () => {
        const controller = userControllerContainer.resolve("userController");
        expect(controller).toBeInstanceOf(UserController);
    });

    test('should create UserControllerWithLogging', () => {
        const controller = userControllerContainer.resolve("userControllerAuthed");
        expect(controller).toBeInstanceOf(UserControllerWithLogging);
    });

    test('should throw error for invalid controller type', () => {
        expect(() => userControllerContainer.resolve("invalidController")).toThrow();
    });
});
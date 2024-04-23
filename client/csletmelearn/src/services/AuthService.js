import api from "../http";

// Command pattern used here to separate the request logic from the service in oreder to make it more testable and flexible

//parent class
class Command {
    execute() {
        throw new Error('This method must be overwritten!');
    }
}

//One of the many child classes representing a specific command (request)
class LoginCommand extends Command {
    execute(email, password) {
        return api.post('/login', {email, password});
    }
}

class RegistrationCommand extends Command {
    execute(email, password) {
        return api.post('/registration', {email, password});
    }
}

class LogoutCommand extends Command {
    execute() {
        return api.post('/logout');
    }
}

class GoogleAuthHandleCommand extends Command {
    async execute(email, password) {
        const isUser = await api.post('/isuser', {email})


        if(isUser.data){

            return {
                response : await api.post('/login', {email, password}),
                job : "login"
            }
        }
        else{
            return {
                response : await api.post('/registration', {email, password}),
                job : "registration"
            }
        }
    }
}

//Service class that will be used to execute the commands
export default class AuthService {
    constructor() {
        this.commands = {
            login: new LoginCommand(),
            registration: new RegistrationCommand(),
            logout: new LogoutCommand(),
            googleAuthHandle: new GoogleAuthHandleCommand()
        };
    }

    executeCommand(commandName, ...args) {
        if (!this.commands[commandName]) {
            throw new Error(`Command ${commandName} not found`);
        }
        return this.commands[commandName].execute(...args);
    }
}
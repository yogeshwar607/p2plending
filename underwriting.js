const userController = require('./controller/userController');
const logger = require('./utils/logger')

function init(){
    const userId = '9f799ba9-b00b-40f2-8359-5297ef3cdd4c'    
    return userController.getUser(userId)
    .then((data) => {
      logger.info(userId, 'successfully got user from userId');
      logger.info(data);
    })
    .catch((e) => {
      logger.err(userId, 'error while getting user', e);
    })
}
init()
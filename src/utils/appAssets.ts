import { Assets } from 'react-native-ui-lib';

export default {
    icons: Assets.loadAssetsGroup('icons', {
        profile: require('../assets/icons/user.png'),
        search: require('../assets/icons/search.png'),
        add: require('../assets/icons/plus.png'),
        camera: require('../assets/icons/camera.png'),
        man: require('../assets/images/man.png')
    }),
    images: Assets.loadAssetsGroup('images', {
        trainer: require('../assets/images/pokemon-trainer.png'),
        pokebola: require('../assets/images/pokebola.png'),
        close: require('../assets/images/close.png')
    })
}
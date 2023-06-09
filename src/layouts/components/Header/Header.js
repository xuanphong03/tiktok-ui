import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEllipsisVertical,
    faGear,
    faGlobe,
    faKeyboard,
    faSignOut,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { UploadIcon, MessageIcon, InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';

import config from '~/config';

const cx = classNames.bind(styles)
const MENUS_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGlobe} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    }
]

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/profile'
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin'
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/setting'
    },
    ...MENUS_ITEMS,
    {
        separate: true,
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout'
    },
]


function Header() {

    const currentUser = true;
    // Handle  logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Logic    
                break;
            default:
        }
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}><img src={images.logo} alt="Tiktok" /></Link>
                <Search />
                <div className={cx('actions')}>
                    {currentUser ?
                        (
                            <>
                                <Tippy delay={[0, 50]} content="Upload video" placement='bottom'>
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('badge')}>12</span>
                                    </button>
                                </Tippy>
                            </>
                        ) : (<>
                            <Button text>Upload</Button>
                            <Button primary >Log in</Button>
                        </>)
                    }
                    <Menu
                        items={currentUser ? USER_MENU : MENUS_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ?
                            (<Image
                                className={cx('user-avatar')}
                                src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/a187c4dfa896a5ea449a4c5d3927b20a~c5_100x100.jpeg?x-expires=1683781200&x-signature=J62yMGFLHeiCIW4%2BURGZTlSAS9w%3D'
                                alt='Độ Mixi'
                            />) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>)
                        }
                    </Menu>
                </div>
            </div>
        </header >
    );
}

export default Header;
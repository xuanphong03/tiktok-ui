import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} alt="Hoa" src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/a187c4dfa896a5ea449a4c5d3927b20a~c5_300x300.webp?x-expires=1683648000&x-signature=fIekIm3Lh5hMMrXajF0BqCbvoSc%3D" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>mixigaming</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>Độ Phùng</span>
            </div>
        </div>
    );
}

export default AccountItem;
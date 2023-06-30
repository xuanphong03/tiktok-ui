import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '~/hooks';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { SearchIcon } from '~/components/Icons/';
import AccountItem from '~/components/AccountItem/';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import * as searchServices from '~/services/searchService'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        }


        fetchApi();
    }, [debouncedValue])

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    }

    const handleHideResult = () => {
        setShowResult(false);
    }

    const handleChangeValue = e => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    }

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. 
        <div>
            <HeadlessTippy
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Accounts
                            </h4>
                            {searchResult.map(result => {
                                return <AccountItem key={result.id} data={result} />
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
                visible={showResult && searchResult.length > 0}
                interactive
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search accounts and videos'
                        spellCheck={false}
                        onFocus={() => setShowResult(true)}
                        onChange={handleChangeValue}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>)
                    }
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
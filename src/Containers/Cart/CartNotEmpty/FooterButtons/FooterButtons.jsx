import styles from './FooterButtons.module.scss';

const FooterButtons = () => {
    return (
        <div className={styles.FooterButtons}>
            <a href="/" className={`button button--outline ${styles.go_back_btn}`}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Go back</span>
            </a>
            <div className={`button ${styles.pay_btn}`}>
                <span>Pay now</span>
            </div>
        </div>
    );
}

export default FooterButtons;
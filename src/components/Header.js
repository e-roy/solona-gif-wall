import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = ({ parentCallback }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          setWalletAddress(response.publicKey.toString());
          parentCallback(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      parentCallback(response.publicKey.toString());
    }
  };

  useEffect(() => {
    window.addEventListener("load", async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerItems}>
        <div className={styles.headerText}>🖼 GIF Portal</div>
        {!walletAddress && (
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}
          >
            Connect to Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

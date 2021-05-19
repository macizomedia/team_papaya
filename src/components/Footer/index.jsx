import React from "react";
import papaya1 from "../../assets/img/hatPapaya.png";
import papaya2 from "../../assets/img/sneakerspapaya.png";
import papaya3 from "../../assets/img/biquiniPapaya.png";

export default function index() {
    return (
        <footer className="footer">
            <div style={{ width: "10%", display: "flex" }}>
                <img src={papaya1} alt="" />
                <img src={papaya2} alt="" />
                <img src={papaya3} alt="" />
            </div>
            {/* <h6 className="footer__title white uppercase">Logo</h6> */}
            <div className="content">
                <div className="divider"></div>
            </div>
            <p className="subtitle">Company Papaya © 2021.</p>
        </footer>
    );
}

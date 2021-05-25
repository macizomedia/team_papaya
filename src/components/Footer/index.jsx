import React from "react";
import papaya1 from "../../assets/img/hatPapaya.png";
import papaya2 from "../../assets/img/sneakerspapaya.png";
import papaya3 from "../../assets/img/biquiniPapaya.png";

export default function index() {
    return (
        <footer className="footer" style={{ backgroundColor: "#e21d22" }}>
            <div
                style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0 auto",
                }}
            >
                <div className="mx-3">
                    <img src={papaya1} alt="" />
                </div>
                <div className="mx-3">
                    <img src={papaya2} alt="" />
                </div>
                <div className="mx-3">
                    <img src={papaya3} alt="" />
                </div>
            </div>

            <p className="subtitle">Company Papaya © 2021.</p>
        </footer>
    );
}

import React, { useContext } from "react";
import { CountryContext } from "../../store/CountryProvider";
import { useCountryState } from "../../store/index";

function DreamList() {
    const fakeArray = ["USA", "Germany", "Argentina"];
    const test = useContext(CountryContext);
    console.log(test);
    return (
        <div className="dreamList my-4">
            <div class="card ">
                <div class="card__mobile-title">
                    <div class="content">
                        <h3>What's your next destination?</h3>
                        <p>Make your Dream list come true!</p>
                    </div>
                </div>
                <div class="card__body content row u-center">
                    <div className="col-6 ">
                        <ul className="no-bullets">
                            {fakeArray.map((item) => (
                                <a href="" style={{ display: "block" }}>
                                    <i class="fas fa-plane-departure"></i>
                                    {item}
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DreamList;

/* 
<div class="list-dropdown">
                        <button class="btn-transparent btn-dropdown m-0">
                            My Dream List{" "}
                            <i
                                class="fa fa-wrapper fa-caret-down"
                                aria-hidden="true"
                            ></i>
                        </button>
                        <ul class="menu">
                            <li class="menu-item">
                                <a href="!#">Google Chrome</a>
                            </li>
                            <li class="menu-item">
                                <a href="!#">Firefox</a>
                            </li>
                            <li class="menu-item">
                                <a href="!#">Polarity</a>
                            </li>
                        </ul>
                    </div>
*/

import AuthService from "../../utils/AuthService";
import fetchWithJWT from "../../utils/fetchWithJWT";
import { useState } from "react";

function JoinHouse(){
    return (
        <div>
            <form>
                <div className="input-group">
                    <label className="input-group-text" htmlFor="join-house-input">Join Code</label>
                    <input className="form-control" type="text" id="join-house-input"></input>
                </div>
            </form>
        </div>
    )
};

export default JoinHouse;
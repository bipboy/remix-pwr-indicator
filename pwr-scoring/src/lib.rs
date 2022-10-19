extern crate zxcvbn;

use std::fmt::Debug;
use std::time::Duration;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use zxcvbn::{feedback::Feedback, *};

/// Represents the time to crack a password.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct CrackTimes {
    /// Back-of-the-envelope crack time estimations, in seconds, based on a few scenarios.
    pub guesses: String,

    /// Online attack on a service that rate-limits password attempts.
    pub online_throttling_100_per_hour: String,

    /// Online attack on a service that doesn't rate-limit,
    /// or where an attacker has outsmarted rate-limiting.
    pub online_no_throttling_10_per_second: String,

    /// Offline attack, assumes multiple attackers.
    /// Proper user-unique salting, and a slow hash function
    /// such as bcrypt, scrypt, PBKDF2.
    pub offline_slow_hashing_1e4_per_second: String,

    /// Offline attack with user-unique salting but a fast hash function
    /// such as SHA-1, SHA-256, or MD5. A wide range of reasonable numbers
    /// anywhere from one billion to one trillion guesses per second,
    /// depending on number of cores and machines, ballparking at 10 billion per second.
    pub offline_fast_hashing_1e10_per_second: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct Scoring {
    /// Get the amount of guesses needed to crack the password.
    pub guesses: String,
    /// Order of magnitude of `guesses`
    pub guesses_log10: f64,
    /// List of back-of-the-envelope crack time estimations based on a few scenarios.
    crack_times: CrackTimes,
    /// Overall strength score from 0-4.
    /// Any score less than 3 should be considered too weak.
    score: u8,
    /// How long it took to calculate the answer.
    calc_time: Duration,
    /// Verbal feedback to help choose better passwords. Set when `score` <= 2.
    feedback: Option<Feedback>,
}

#[wasm_bindgen]
pub fn entropy(password: &str) -> Result<JsValue, JsValue> {
    let entropy = zxcvbn(password, &[]).unwrap();

    let result = Scoring {
        guesses: entropy.guesses().to_string(),
        guesses_log10: entropy.guesses_log10(),
        score: entropy.score(),
        crack_times: CrackTimes {
            guesses: entropy.crack_times().guesses().to_string(),
            online_throttling_100_per_hour: entropy
                .crack_times()
                .online_throttling_100_per_hour()
                .to_string(),
            online_no_throttling_10_per_second: entropy
                .crack_times()
                .online_no_throttling_10_per_second()
                .to_string(),
            offline_slow_hashing_1e4_per_second: entropy
                .crack_times()
                .offline_slow_hashing_1e4_per_second()
                .to_string(),
            offline_fast_hashing_1e10_per_second: entropy
                .crack_times()
                .offline_fast_hashing_1e10_per_second()
                .to_string(),
        },
        calc_time: entropy.calculation_time(),
        feedback: entropy.feedback().clone(),
    };

    Ok(serde_wasm_bindgen::to_value(&result)?)
}

#[wasm_bindgen]
pub fn scoring(password: &str) -> u8 {
    let entropy = zxcvbn(password, &[]).unwrap();

    entropy.score()
}

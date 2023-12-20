import React from 'react'

export const ViewStarCommon = (star) => {
    let checkStar = Number.isInteger(star);
    let integerStar = 0;
    if (star) {
        integerStar = Number.parseInt(star)
    }
    else {
        integerStar = 5;
    }
    const stars = [];
    for (let i = 0; i < integerStar; i++) {
        stars.push(
            <li><i className="fas fa-star"></i></li>
        );
    }
    return (
        <ul className="ratings">
            {stars}
            {
                !checkStar && <li><i className="fa fa-star-half"></i></li>
            }
            {
                star ? <li><a>({star})</a></li> : ""
            }
        </ul>
    )
}
//fa fa-star-half
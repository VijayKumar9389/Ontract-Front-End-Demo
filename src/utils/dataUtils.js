export function searchName(name, inputTxt) {

    if (inputTxt === '') {
        return true;
    }
    if (name.includes(inputTxt)) {
        return true;
    }

    return false;
}

function searchtxt(stakeholder, filter) {

    if (stakeholder.NAME !== '') {
        if (filter.search.type == 0) {
            if (searchName(stakeholder.NAME.toLowerCase(), filter.search.txt.toLowerCase())) {
                return true

            }
        }
        if (filter.search.type == 1) {
            if (searchNumber(stakeholder.PHONE, filter.search.txt)) {
                return true
            }
        }
    }

    return false;
}

export function searchNumber(phoneNo, inputTxt) {
    if (inputTxt === '') {
        return true
    } else {
        var numbers = phoneNo.split(',');

        for (let index = 0; index < numbers.length; index++) {

            var cleanOne = numbers[index].replace('(', '').replace(')', '').replace(/-/g, '');
            var cleanTwo = cleanOne.split(':')

            if (cleanTwo[1] !== undefined && cleanTwo[1].includes(inputTxt)) {
                return true;
            }
        }
        return false;
    }
}

export function checkLocation(stakeholder, filter) {
    if (!stakeholder || typeof stakeholder.MAILING !== 'string') {
        return false; // Return false if the stakeholder or the STREET property is missing or not a string
    }

    const stakeholderLocation = stakeholder.MAILING.split(',');
    const stakeholderProvince = stakeholderLocation[stakeholderLocation.length - 2];
    const stakeholderCity = stakeholderLocation[stakeholderLocation.length - 3];
    const location = { province: stakeholderProvince, city: stakeholderCity };


    if (filter.province === '' && filter.city === '') {
        return true;
    }

    if (filter.province === 'MISSING') {
        if (stakeholderLocation.length < 3 || stakeholder.STREET === '') {
            return true;
        }
    }

    if (filter.province !== '') {
        if (filter.province.includes(location.province)) {
            if (filter.city !== '') {
                if (filter.city.includes(location.city)) {
                    return true;
                }
            } else {
                return true;
            }
        }
    }

    return false;
}



function viewStakeholders(stakeholder, filter) {

    if (filter.value == 0) {
        return true;
    }

    if (filter.value == 1) {
        if (stakeholder.CONTACTED === "YES") {
            return true
        }
    }

    if (filter.value == 2) {
        if (stakeholder.CONTACTED !== "YES") {
            return true
        }
    }

    if (filter.value == 3) {
        if (stakeholder.ATTEMPTS !== "") {
            return true
        }
    }

    if (filter.value == 4) {
        if (stakeholder.ATTEMPTS === "") {
            return true
        }
    }

    return false;
}

export function filterStakeholders(stakeholders, filter) {
    let filteredStakeholders = [];

    for (let index = 0; index < stakeholders.length; index++) {
        const stakeholder = stakeholders[index];
        const stakeholderInfo = stakeholder[0];

        if (searchtxt(stakeholderInfo, filter)) {
            if (viewStakeholders(stakeholderInfo, filter)) {
                if (checkLocation(stakeholderInfo, filter)) {
                    filteredStakeholders.push(stakeholder);
                }
            }
        }
    }
    return filteredStakeholders;
}
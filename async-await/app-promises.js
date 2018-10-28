const users = [
    {
        id: 1,
        name: 'Don',
        schoolId: 101
    },
    {
        id: 2,
        name: 'Dan',
        schoolId: 999
    }
];
const grades = [
    {
        id: 1,
        schoolId: 101,
        grade: 69
    },
    {
        id: 2,
        schoolId: 101,
        grade: 96
    },
    {
        id: 3,
        schoolId: 999,
        grade: 89
    },
    {
        id: 4,
        schoolId: 999,
        grade: 86
    }
];

const getUser = id => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    });
};

const getGrades = schoolId => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId));
    });
};

const getStatus = id => {
    let user;
    return getUser(id)
        .then(tempUser => {
            user = tempUser;
            return getGrades(user.schoolId);
        })
        .then(grades => {
            let total = 0;
            grades.forEach(grade => (total += grade.grade));
            const avg = total / grades.length;
            return `${user.name} has ${avg}% in the class`;
        });
};

const getStatusAlt = async id => {
    const user = await getUser(id);
    const grades = await getGrades(user.schoolId);
    let total = 0;
    grades.forEach(grade => (total += grade.grade));
    const avg = total / grades.length;
    return `${user.name} has ${avg}% in the class`;
};

getStatusAlt(1)
    .then(status => {
        console.log(status);
    })
    .catch(e => {
        console.log(e);
    });

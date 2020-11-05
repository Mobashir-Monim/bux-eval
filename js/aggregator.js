const aggregateCourseSections = () => {
    Object.keys(courseList).forEach(c => {
        let temp = cct(), course = courseList[c];

        Object.keys(course.sections).forEach(section => {
            Object.keys(course.cats).forEach(cat => { temp[cat] += course.sections[section].cats[cat]; })
            temp.r += course.sections[section].respondents;
            averageValues(course.sections[section]);
            qStatAgSec(course, section);
            course.sections[section].students = usisReg.filter(reg => { return reg["Course_ID"] == course.name && reg["section"] == course.sections[section].section }).length;
        })

        course.respondents = temp.r;
        course.students = usisReg.filter(reg => { return reg["Course_ID"] == course.name }).length;
        averageValues(course, temp);
    })

    generateReport();
}

const averageValues = (cont, temp = null) => {
    for (cat in cont.cats) {
        if (temp != null) {
            cont.cats[cat] = temp[cat];
        }

        cont.cats[cat] /= cont.respondents;
    }
}

const addToCourse = (temp, templ, cs, cl) => {
    Object.keys(cs.cats).forEach(cat => {
        cs.cats[cat] += temp[cat];
    })

    if (templ != null) {
        Object.keys(templ.cats).forEach(key => {
            cl.cats[key] += templ.cats[key];
        })
        
        templ.lfs.forEach(fac => {
            cl.lfs.push(deepCopy(fac))
        })

        cl.respondents += 1;
    }
    
    cs.respondents += 1;
}

const qStatAg = (cont, q, op, mult = 1) => {
    if (!cont.qStat.hasOwnProperty(q)) {
        cont.qStat[q] = {};
    }

    if (!cont.qStat[q].hasOwnProperty(op)) {
        cont.qStat[q][op] = 0;
    }

    cont.qStat[q][op] += 1 * mult;
}

const qStatAgSec = (course, section) => {
    for (q in course.sections[section].qStat) {
        for (op in course.sections[section].qStat[q]) {
            qStatAg(course, q, op, course.sections[section].qStat[q][op]);
        }
    }
}
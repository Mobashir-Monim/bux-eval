const csq = Object.filter(questionMatrix, 'calc', 'course-section');
const clq = Object.filter(questionMatrix, 'calc', 'lab-section');
const clfq = Object.filter(questionMatrix, 'calc', 'lab-ini');
const cfq = [Object.filter(questionMatrix, 'calc', 'lf1'), Object.filter(questionMatrix, 'calc', 'lf2')];

const analyzeCourseSection = () => {
    evals.forEach(row => {
        let temp = cst(), q, templ = null, cs = gcs(row["Course"], row["Section Number"]), cl = null;
        evalCSRow(q, temp, row, cs);

        if (labCourses.includes(row["Course"])) {
            cl = gcl(row["Course"], findLabSection(row));
            templ = evalCLRow(q, row, cl);
        }

        // factorWeight(temp, templ);
        addToCourse(temp, templ, cs, cl);
    })

    compileDeptCourses();
    aggregateDeptCourseScores();
}

const evalCSRow = (q, temp, row, cs) => {
    for (q in csq) {
        if (csq[q].type.includes('radio')) {
            optionValsAdd(temp, csq[q].options[row[q]]);
            
            if (questionMatrix[q].calc.includes('qAg')) {
                qStatAg(cs, q, row[q]);
            }
        } else {
            evalCheckbox(csq, q, row, temp, cs);
        }
    }
}

const evalCLRow = (q, row, cl) => {
    let templ = clt(), pointer = 0;
    templ.section = findLabSection(row);

    for (q in clq) {
        if (row[q] != "NADA BADA") {
            if (clq[q].type.includes('radio')) {
                optionValsAdd(templ.cats, clq[q].options[row[q]]);
                
                if (clq[q].calc.includes('qAg')) {
                    qStatAg(cl, q, row[q]);
                }
            } else {
                evalCheckbox(clq, q, row, templ.cats, cl);
            }
        }
    }

    Object.keys(clfq).forEach(fac => {
        evalCLFRow(templ, row, pointer, row[fac]);
        pointer += 1;
    })

    return templ;
}

const evalCLFRow = (templ, row, pointer, fac) => {
    if (fac != 'NADA BADA' && fac != '' && fac != undefined) {
        templf = clft();
        templf.ini = fac.split(",")[0];

        Object.keys(cfq[pointer]).forEach(q => {
            if (row[q] != 'NADA BADA' && row[q] != '' && row[q] != undefined) {
                if (cfq[pointer][q].type.includes('radio')) {
                    optionValsAdd(templf, cfq[pointer][q].options[row[q]]);
                } else {
                    evalCheckbox(cfq[pointer], q, row, templf);
                }
            }
        })

        templf.respondents += 1;
        templ.lfs.push(templf);
    }
}

const findLabSection = (row) => {
    let section = undefined, flag = false;

    Object.keys(clfq).forEach(key => {
        if (row[key] != 'NADA BADA' && row[key] != '' && row[key] != undefined && (section == undefined || isNaN(section))) {
            section = parseInt(row[key].split(',')[1]);
            flag = true;
        }
    })

    if (flag) {
        section = row["Section Number"];
    }

    return isNaN(parseInt(section)) ? "undefined" : section;
}

const evalCheckbox = (qbank, q, row, temp, cont = null) => {
    Object.keys(qbank[q].options).forEach(opt => {
        if (row[q].includes(opt)) {
            optionValsAdd(temp, qbank[q].options[opt]);
            
            if (cont != null && qbank[q].calc.includes('qAg')) {
                qStatAg(cont, q, opt);
            }
        }
    })
}

const optionValsAdd = (temp, vals) => {
    Object.keys(vals).forEach(key => {
        temp[key] += vals[key];
    })
}

const factorWeight = (temp, templ) => {
    temp.w = temp.w.toFixed(2);

    Object.keys(temp).forEach(key => {
        if (key != 'w'  && typeof(temp[key]) == 'number' && key != 'rf' && key != 'fr') {
            temp[key] *= temp.w;
        }
    })

    if (templ != null) {
        Object.keys(templ.cats).forEach(cat => {
            templ.cats[cat] *= temp.w; })

        templ.lfs.forEach(fac => {
            Object.keys(fac.cats).forEach(cat => {
                fac.cats[cat] *= temp.w;
            })
        })
    }
}

const compileDeptCourses = () => {
    for (c in courseList) {
        if (fractions[c].length > 1) {
            fractions[c].forEach(f => {
                let tempC = createCourse(c), secs = f.sections.split(',');
                let dept = gd(f.frac);
                secs.forEach(sec => {
                    if (courseList[c].sections.hasOwnProperty(sec)) {
                        tempC.sections[sec] = deepCopy(courseList[c].sections[sec]); }});
                
                tempC.labs = deepCopy(courseList[c].labs);
                dept.courses[c] = tempC;
            });
        } else {
            let dept = gd(fractions[c][0].frac);
            dept.courses[c] = deepCopy(courseList[c]);
        }
    }
}
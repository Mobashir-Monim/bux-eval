let content = '';

const generateReport = () => {
    content = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"><link rel="stylesheet" href="css/report.css"><title>Eval Report</title></head><body><div class="container" id="out-div">`;

    for (c in courseList) {
        content = `${ content }${ addSections(courseList[c]) }`;
    }

    content = `${ content }</div></body></html>`;
}

const addKeyLegend = () => {
    let html = "";

    for (cat in factorsMatrix) {  
        html = `${ html } <div class="col-md-6"><h6 class="border-bottom mb-0">[ ${ cat } ] ${ factorsMatrix[cat].name } </h6><p class="kl-desc mb-4 mt-0 text-right">${ factorsMatrix[cat].description }</p></div>`;
    }

    return html;
}

const devSection = (cont, type) => {
    let n = '';

    if (type == 'course') {
        n = `${ cont.name }`
    } else {
        n = `${ type } - Section: ${ cont.section }`
    }

    let html = `<div class="row mb-3"><div class="col-md-6"><h6 class="mb-0">Course Code: ${ n }</h6></div><div class="col-md-3 d-flex align-items-end"><p class="text-right w-100">Total Students: ${ cont.students }</p></div><div class="col-md-3 d-flex align-items-end"><p class="text-right w-100">Total Respondents: ${ cont.respondents }</p></div></div><div class="row">
    <div class="col-md-12">`;

    for (cat in cont.cats) {
        html = `${ html }<span class="cat-cont"><b>${ cat }:</b> <span class="cat-num">${ (100 * (cont.cats[cat] - factorsMatrix[cat].minVal) / factorsMatrix[cat].diff).toFixed(3) }%</span></span>`;
    }

    html = `${ html }</div></div><div class="row mb-3 border-bottom mt-3"><div class="col-md-12"><h6 class="mb-0">Stats</h6></div></div><div class="row mb-3">`;

    for (q in cont.qStat) {
        html = `${ html }<div class="col-md-6 mb-4"><p class="mb-0 border-bottom"><b>${ q }</b></p>`;

        for (opt in cont.qStat[q]) {
            html = `${ html }<p class="w-100"><b>${ (100 * cont.qStat[q][opt] / cont.respondents).toFixed(1) }%</b> respondents said '<i>${ opt }</i>'</p>`;
        }

        html = `${ html }</div>`;
    }

    return `${ html }</div>`;
}

const addSections = (course) => {
    let html = `${ devHeader(true) }${ devSection(course, 'course') }`;

    for (section in course.sections) {
        html = `${ html }${ devHeader() }${ devSection(course.sections[section], course.name) }`;
    }

    return html;
}

const devHeader = (t = false) => {
    let x = `<div class="row mb-4 mt-4"><div class="col-md-12 py-2" id="co-out"><h5 class="border-bottom">Course Overall Report</h5></div></div>`;

    return `<p class="pb"></p><div class="row my-4 align-items-center"><div class="col-4 col-sm-2"><img src="img/buX-color.png" alt="buX-logo" class="img-fluid"></div><div class="col-8 col-sm"><h2 class="border-bottom d-none d-sm-block">Course Evaluation Report</h2><h5 class="border-bottom d-block d-sm-none">Course Evaluation Report</h5></div></div><div class="row"><div class="col-md-12 legend-area py-2"><h5 class="border-bottom">Key Legend</h5><div class="row">${ addKeyLegend() }</div></div></div>${ t == true ? x : '' }`;
}
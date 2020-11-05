let courseList = {};

const getCourse = (name) => {
    if (!courseList.hasOwnProperty(name)) {
        courseList[name] = createCourse(name);
    }

    return courseList[name];
}

const getCourseSection = (name, section) => {
    let course = getCourse(name);

    if (!course.sections.hasOwnProperty(section)) {
        course.sections[section] = createSection(section);
    }

    return course.sections[section];
}

const getCourseLab = (name, section) => {
    let course = getCourse(name);

    if (!course.labs.hasOwnProperty(section)) {
        course.labs[section] = createLab(section);
    }

    return course.labs[section];
}

const createCourse = (name) => {
    let course = deepCopy(courseTemplate);
    course.name = name;
    return course;
}

const createSection = (sectionNumber) => {
    let section = deepCopy(sectionTemplate);
    section.section = sectionNumber; 
    return section;
}

const createLab = (sectionNumber) => {
    let lab = deepCopy(labTemplate);
    lab.section = sectionNumber; 
    return lab;
}

const createSectionTemp = () => {
    return deepCopy(sectionTempEvalTemplate);
}

const createCourseTemp = () => {
    return deepCopy(courseTempEvalTemplate);
}

const createLabTemp = () => {
    return deepCopy(labTemplate);
}

const createLabFacultyTemp = () => {
    return deepCopy(labFacultyTemplate);
}

const gc = (n) => {
    return getCourse(n);
}

const gcs = (n, s) => {
    return getCourseSection(n, s);
}

const gcl = (n, s) => {
    return getCourseLab(n, s);
}

const cst = () => {
    return createSectionTemp();
}

const cct = () => {
    return createCourseTemp();
}

const clt = () => {
    return createLabTemp();
}

const clft = () => {
    return createLabFacultyTemp();
}
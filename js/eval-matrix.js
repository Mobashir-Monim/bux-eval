window.onload = () => {
    for (const question in questionMatrix) {
        if (!questionMatrix[question].calc.includes('non-eval')) {
            const temp = stripCatVals(questionMatrix[question]);

            if (questionMatrix[question].type.includes('radio')) {
                radioEval(temp);
            } else {
                checkBoxEval(temp);
            }
        }
    }

    wFactorAndDiff();
}

const stripCatVals = (question) => {
    let temp = {};
    Object.keys(question.options).forEach(option => {
        Object.keys(question.options[option]).forEach(cat => {
            if (!temp.hasOwnProperty(cat)) { temp[cat] = []; }
            temp[cat].push(question.options[option][cat]); }) })

    Object.keys(temp).forEach(cat => {
        temp[cat].sort((a, b) => { return a - b }); })

    return temp;
}

const radioEval = temp => {
    Object.keys(temp).forEach(cat => {
        if (cat != 'w') {
            if (temp[cat][temp[cat].length - 1] > 0) {
                factorsMatrix[cat].maxVal += temp[cat][temp[cat].length - 1];
            }
    
            factorsMatrix[cat].minVal += temp[cat][0];
        }
    })
}

const checkBoxEval = temp => {
    Object.keys(temp).forEach(cat => {
        if (cat != 'w') {
            temp[cat].forEach(val => {
                if (val > 0) {
                    factorsMatrix[cat].maxVal += val
                } else {
                    factorsMatrix[cat].minVal += val;
                }
            })
        }
    })
}

const wFactorAndDiff = () => {
    // factorsMatrix.w.maxVal = factorsMatrix.w.maxVal.toFixed(2);
    // factorsMatrix.w.minVal = factorsMatrix.w.minVal.toFixed(2);

    Object.keys(factorsMatrix).forEach(f => {
        // if (f != 'w') {
            // factorsMatrix[f].maxVal *= factorsMatrix.w.maxVal;
            
            // if (factorsMatrix[f].minVal > 0) {
            //     factorsMatrix[f].minVal *= factorsMatrix.w.minVal;
            // } else {
            //     factorsMatrix[f].minVal *= factorsMatrix.w.maxVal;
            // }

            factorsMatrix[f].diff = factorsMatrix[f].maxVal - factorsMatrix[f].minVal;
        // }
    })
}

const factorsMatrix = {
    lq: {
        name: "Lecture Quality",
        description: "quantitative measure of the quality of the content provided",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    cq: {
        name: "Course Quality",
        description: "quantitative measure of the number of additional content and its effectiveness",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    le: {
        name: "Lecture Effort",
        description: "quantitative measure of the effort put into creating the course content",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    ae: {
        name: "Assessment Effort",
        description: "quantitative measure of the effort put into grading/examination",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    lx: {
        name: "Learning Experince Effort",
        description: "quantitative measure of the effort put in to ensure overall better learning experience for the students",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    sp: {
        name: "Student pressure factor",
        description: "the perceived pressure created on the students by the course",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    ca: {
        name: "Course Administration",
        description: "a rating of the administration of the course",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    fr: {
        name: "Faculty Recommendations",
        description: "the number of recommendations received by the faculty",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    rf: {
        name: "Red Flags",
        description: "the number of prohibited actions taken by the faculty",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    ta: {
        name: "Technical Aptitude",
        description: "the quantitative measure of the skill level of using technology",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    cr: {
        name: "Course Rating",
        description: "the quantitative measure of the rating of the course",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    lr: {
        name: "Lab Rating",
        description: "the quantitative measure of the rating of the lab",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    dk: {
        name: "Domain Knowledge",
        description: "the quantitative measure of the domain knowledge of the faculty",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    ldk: {
        name: "Lab Faculty Domain Knowledge",
        description: "the quantitative measure of the domain knowledge of the lab faculty",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    lfe: {
        name: "Lab Faculty Effort",
        description: "the quantitative measure of the effort of the lab faculty",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    llx: {
        name: "Lab Learning Experince Effort",
        description: "quantitative measure of the effort put in to ensure overall better learning experience for the students",
        maxVal: 0,
        minVal: 0,
        diff: 0,
    },
    // w: {
    //     name: "Student Sincerity Factor",
    //     description: "The sincerity factor of the student by which all of the values are multiplied to get a more correct approximation",
    //     maxVal: 0,
    //     minVal: 0,
    //     diff: 0,
    // }
};

const questionMatrix = {
    'How was the audio and video quality for most of the videos in this course? [Audio]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Excellent': { ta: 2 },
            'Poor (audible/ watchable)': { ta: 1 },
            'Very Poor (inaudible/ unwatchable)': { ta: 0 }
        }
    },
    'How was the audio and video quality for most of the videos in this course? [Video]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Excellent': { ta: 2 },
            'Poor (audible/ watchable)': { ta: 1 },
            'Very Poor (inaudible/ unwatchable)': { ta: 0 }
        }
    },
    'How much effort do you think instructors gave to produce good video lectures?': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'They tried really hard to produce good video lectures': { lq: 2, le: 2 },
            'Some of the lectures were good and some were not good.': { lq: 1, le: 1 },
            'Lectures were bad. Minimal effort was given.': { lq: 0, le: 0 }
        }
    },
    'How long were video lectures uploaded before live discussion sessions?': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'More than 2 days before the discussion session': { le: 3, ca: 3, sp: 0 },
            'One day before': { le: 2, ca: 2, sp: 0 },
            'A few hours before': { le: 1, ca: 1, sp: 1 },
            'Right before the discussion session': { le: 0, ca: 0, sp: 2 },
            'After the discussion session': { le: -1, ca: -1, sp: 2 }
        }
    },
    'What was the course\'s video style? Choose all that apply.': {
        type: 'checkbox',
        calc: 'course-section',
        options: {
            'Just reading the slides out loud': { lq: -1, le: -1, lx: 0, ta: 0 },
            'Reading the slides and explaining the slides': { lq: 1, le: 1, lx: 0, ta: 1, ta: 0 },
            'Lecturer can be seen in the videos': { lq: 1, le: 0, lx: 1, ta: 0 },
            'Whiteboard based lecture': { lq: 1, le: 1, lx: 1, ta: 0 },
            'Instructor used a tablet effectively in the Khan Academy style.': { lq: 1, le: 1, lx: 1, ta: 2 },
            'Faculty appears like s/he is talking to the students directly (Zoom style conversation)': { lq: 2, le: 1, lx: 2, ta: 0 },
            'Animated videos': { lq: 2, le: 2, lx: 2, ta: 2 }
        }
    },
    'How many graded homework assignments and quizzes were assigned during the semester? [Graded Homework Assignments]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            '1': { ca: 0, sp: 0, ae: 0 },
            '2': { ca: 0, sp: 0, ae: 0 },
            '3': { ca: 2, sp: 1, ae: 2 },
            '4': { ca: 2, sp: 1, ae: 2 },
            '5': { ca: 2, sp: 1, ae: 2 },
            '6': { ca: 2, sp: 1, ae: 2 },
            '7': { ca: 1, sp: 2, ae: 3 },
            '8': { ca: 1, sp: 2, ae: 3 },
            '9': { ca: 1, sp: 2, ae: 3 },
            'more than 9': { ca: 0, sp: 4, ae: 4 }
        }
    },
    'How many graded homework assignments and quizzes were assigned during the semester? [Graded Quizzes]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            '1': { ca: 0, sp: 0, ae: 0 },
            '2': { ca: 1, sp: 0, ae: 1 },
            '3': { ca: 2, sp: 1, ae: 2 },
            '4': { ca: 2, sp: 1, ae: 2 },
            '5': { ca: 2, sp: 1, ae: 2 },
            '6': { ca: 2, sp: 1, ae: 2 },
            '7': { ca: 1, sp: 2, ae: 3 },
            '8': { ca: 1, sp: 2, ae: 3 },
            '9': { ca: 1, sp: 2, ae: 3 },
            'more than 9': { ca: 0, sp: 4, ae: 4 }
        }
    },
    'How many graded homework assignments and quizzes were assigned during the semester? [Ungraded Quizzes]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            '1': { ca: 0, sp: 0, ae: 0 },
            '2': { ca: 0, sp: 0, ae: 0 },
            '3': { ca: 1, sp: 0, ae: 1 },
            '4': { ca: 2, sp: 1, ae: 2 },
            '5': { ca: 2, sp: 1, ae: 2 },
            '6': { ca: 2, sp: 1, ae: 2 },
            '7': { ca: 2, sp: 1, ae: 2 },
            '8': { ca: 2, sp: 1, ae: 2 },
            '9': { ca: 1, sp: 2, ae: 3 },
            'more than 9': { ca: 0, sp: 4, ae: 4 }
        }
    },
    'What supplementary material was provided? Choose all that apply.': {
        type: 'checkbox',
        calc: 'course-section',
        options: {
            'Bangla lecture videos': { le: 1, lx: 1, cq: 1, sp: 0 },
            'Problem solving videos': { le: 1, lx: 1, cq: 1, sp: 0 },
            'Additional course or topic related videos': { le: 0, lx: 1, cq: 1, sp: 0 },
            'Course notes': { le: 2, lx: 0, cq: 1, sp: 0 },
            'Additional examples': { le: 2, lx: 2, cq: 2, sp: 0 },
            'Extra problem sets to challenge students': { le: 1, lx: 1, cq: 2, sp: 2 },
            'No supplementary provided': {},
        }
    },
    'Did the course use a Google Calendar after midterms to push out notifications?': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { ta: 2, rf: 0 },
            'No': { rf: 1, ta: 0 }
        }
    },
    'Did the instructor use a forum to answer questions? If so, what platform(s)?': {
        type: 'checkbox',
        calc: 'course-section',
        options: {
            'No': { rf: 1, ta: 0 },
            'Slack': { ta: 1, rf: 0 },
            'buX\'s native forum': { ta: 2, rf: 0 },
            'Google Classroom': { ta: 1, rf: 0 },
            'Discord': { ta: 2, rf: 0 },
            'Facebook Group': { ta: 0.5, rf: 0 },
            'Whatsapp': { ta: 0.5, rf: 0 },
            'Gmail': { ta: 0, rf: 0 },
        }
    },
    'How long did it take on average for your section instructor to respond to your questions on Slack or email or other forums?': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Within 6 hours': { lx: 3, sp: 0 },
            'Within 1 day': { lx: 2, sp: 0 },
            'Within 2 days': { lx: 1, sp: 0.5 },
            'Within 3 days': { lx: 0, sp: 1 },
            'Within 4 days': { lx: -.5, sp: 1.5 },
            'Within 1 week': { lx: -1, sp: 2 },
            'Within 2 weeks': { lx: -2, sp: 4 },
            'Teacher did not respond regularly to questions': { lx: -4, sp: 6 }
        }
    },
    'Were the digital platforms used appropriate for smooth student-teacher communication?': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { ta: 1 },
            'No': { ta: 0 }
        }
    },
    'Getting online exams right was hard for everybody.  Did your course instructors try hard to ensure that you could successfully complete your midterm and finals?  [Midterm Exam]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { lx: 1, ae: 2, ca: 2 },
            'They tried to be fair, but were not really successful.': { lx: 1, ae: 1, ca: 1 },
            'They didn\'t care about my exam submission issues.': { lx: -1, ae: -1, ca: -2 }
        }
    },
    'Getting online exams right was hard for everybody.  Did your course instructors try hard to ensure that you could successfully complete your midterm and finals?  [Final Exam]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { lx: 1, ae: 2, ca: 2 },
            'They tried to be fair, but were not really successful.': { lx: 1, ae: 1, ca: 1 },
            'They didn\'t care about my exam submission issues.': { lx: -1, ae: -1, ca: -2 }
        }
    },
    'Did the online lectures cover the course content on the midterm?': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { cq: 3, lq: 3, sp: 0, ae: 2 },
            'They were mostly covered by the lectures': { cq: 1, lq: 2, sp: 1, ae: 1 },
            'Only a few materials were covered by the lectures': { cq: 1, lq: 1, sp: 2, ae: 0 },
            'No. The midterm and video lectures were disconnected.': { cq: 0, lq: 0, sp: 3 }
        }
    },
    'Graded quizzes were [Administered fairly]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { ae: 2 },
            'No': { ae: -1 }
        }
    },
    'Graded quizzes were [Notified 2 days before]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { ae: 1, lx: 1 },
            'No': { ae: -1, lx: 0 }
        }
    },
    'Graded quizzes were [Taken during mid week]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { rf: 1 },
            'No': { rf: 0 }
        }
    },
    'Graded quizzes were [Taken during Sept 18-24]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { rf: 1 },
            'No': { rf: 0 }
        }
    },
    'The following questions are regarding online discussion classes [You attended them regularly]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { w: 1 },
            'No': { w: 0.75 }
        }
    },
    'The following questions are regarding online discussion classes [Section teacher made them interesting and useful]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { lq: 1, le: 1, lx: 1, w: 0 },
            'No': { lq: 0, le: 0, lx: 0, w: 0.05 }
        }
    },
    'The following questions are regarding online discussion classes [They were beneficial for you]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { lq: 1, le: 1, lx: 1, w: 0 },
            'No': { lq: 0, le: 0, lx: 0, w: 0.05 }
        }
    },
    'The following questions are regarding online discussion classes [Attendance were taken during these classes]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { rf: 1 },
            'No': { rf: 0 }
        }
    },
    'The following questions are regarding online discussion classes [Personal and irrelevant topics were discussed.]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { lq: -1 },
            'No': { w: 0.05 }
        }
    },
    'How many discussion sessions did you attend?': {
        type: 'radio',
        calc: 'course-section',
        options: {
            '0': { w: -0.15 },
            '1-5': { w: -0.1 },
            '5 - 10': { w: -0.05 },
            '10 - 15': { w: 0 },
            '15 - 20': { w: 0.05 },
            '20+': { w: 0.1 },
        }
    },
    'If less than 20, I did not attend because': {
        type: 'checkbox',
        calc: 'course-section',
        options: {
            'They were not mandatory': { w: -0.05 },
            'I was busy during the day or asleep.': { w: -0.15 },
            'They were not helpful': { w: 0.05 },
            'I had technical difficulties.': { w: 0.1 },
            'The recorded buX lectures were enough for me.': { w: 0.05 }
        }
    },
    'What *fair* strategies could be used that would get you to attend more live discussions next semester?': {
        type: 'ocheckbox',
        calc: 'course-section qAg',
        options: {
            'The instructor solved problems during the class': {},
            'Breakout rooms existed where students could discuss problems and topics among themselves.': {},
            'Breakout rooms existed where students could just study the material during the discussion sessions. They wouldn\'t have to interact with others.': {},
            'Marks were given for attending live discussions.': {},
            'One discussion session per week instead of two.': {},
        }
    },
    'How would you rate the administration of this course on a scale of 1 to 10?': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { ca: 1 },
            '2': { ca: 2 },
            '3': { ca: 3 },
            '4': { ca: 4 },
            '5': { ca: 5 },
            '6': { ca: 6 },
            '7': { ca: 7 },
            '8': { ca: 8 },
            '9': { ca: 9 },
            '10': { ca: 10 }
        }
    },
    'How would you rate your section teacher on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Dedication of teaching]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { le: 1 },
            '2': { le: 2 },
            '3': { le: 3 },
            '4': { le: 4 },
            '5': { le: 5 },
            '6': { le: 6 },
            '7': { le: 7 },
            '8': { le: 8 },
            '9': { le: 9 },
            '10': { le: 10 },
        }
    },
    'How would you rate your section teacher on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Helpfulness]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { lx: 1 },
            '2': { lx: 2 },
            '3': { lx: 3 },
            '4': { lx: 4 },
            '5': { lx: 5 },
            '6': { lx: 6 },
            '7': { lx: 7 },
            '8': { lx: 8 },
            '9': { lx: 9 },
            '10': { lx: 10 },
        }
    },
    'How would you rate your section teacher on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Knowledgeable about subject matter ]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { dk: 1 },
            '2': { dk: 2 },
            '3': { dk: 3 },
            '4': { dk: 4 },
            '5': { dk: 5 },
            '6': { dk: 6 },
            '7': { dk: 7 },
            '8': { dk: 8 },
            '9': { dk: 9 },
            '10': { dk: 10 },
        }
    },
    'Would you recommend this section teacher to other students?': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { fr: 1 },
            'No': { fr: 0 },
            'No strong opinion about  this section teacher.': { fr: 0 }
        }
    },
    'Lab Teacher 1\'s initials and section number. Enter them separated by commas like: MMM, 13': {
        type: 'text',
        calc: 'non-eval lab-ini',
    },
    'Lab teacher 2\'s initials and section number. Enter them separated by commas.': {
        type: 'text',
        calc: 'non-eval lab-ini',
    },
    'Were the lab assignments [Helpful in learning how to implement the theory??]': {
        type: 'radio',
        calc: 'lab-section qAg',
        options: {
            'Yes': { lr: 1 },
            'No': { lr: 0 },
            'N/A': { lr: 0 }
        }
    },
    'Were the lab assignments [Too Few?]': {
        type: 'radio',
        calc: 'lab-section qAg',
        options: {
            'Yes': { lr: 0 },
            'No': { lr: 1 },
            'N/A': { lr: 0 }
        }
    },
    'Were the lab assignments [Relevant to the course?]': {
        type: 'radio',
        calc: 'lab-section qAg',
        options: {
            'Yes': { lr: 1 },
            'No': { lr: 0 },
            'N/A': { lr: 0 }
        }
    },
    'Were the lab assignments [In sync with the theory lectures?]': {
        type: 'radio',
        calc: 'lab-section qAg',
        options: {
            'Yes': { lr: 1 },
            'No': { lr: 0 },
            'N/A': { lr: 0 }
        }
    },
    'Were the lab assignments [Very old, not modern?]': {
        type: 'radio',
        calc: 'lab-section qAg',
        options: {
            'Yes': { lr: 0 },
            'No': { lr: 1 },
            'N/A': { lr: 0 }
        }
    },
    'Were the lab assignments [Appropriate simulation tools were used for online labs? ]': {
        type: 'radio',
        calc: 'lab-section qAg',
        options: {
            'Yes': { lr: 1 },
            'No': { lr: 0 },
            'N/A': { lr: 0 }
        }
    },
    'How would you rate your Lab teacher 1  on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Dedication of teaching]': {
        type: 'radio',
        calc: 'lab-section lf1',
        options: {
            '1': { lfe: 1 },
            '2': { lfe: 2 },
            '3': { lfe: 3 },
            '4': { lfe: 4 },
            '5': { lfe: 5 },
            '6': { lfe: 6 },
            '7': { lfe: 7 },
            '8': { lfe: 8 },
            '9': { lfe: 9 },
            '10': { lfe: 10 },
            'N/A': { lfe: 0 }
        }
    },
    'How would you rate your Lab teacher 1  on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Helpfulness]': {
        type: 'radio',
        calc: 'lab-section lf1',
        options: {
            '1': { llx: 1 },
            '2': { llx: 2 },
            '3': { llx: 3 },
            '4': { llx: 4 },
            '5': { llx: 5 },
            '6': { llx: 6 },
            '7': { llx: 7 },
            '8': { llx: 8 },
            '9': { llx: 9 },
            '10': { llx: 10 },
            'N/A': { llx: 0 }
        }
    },
    'How would you rate your Lab teacher 1  on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Knowledgeable about subject matter ]': {
        type: 'radio',
        calc: 'lab-section lf1',
        options: {
            '1': { ldk: 1 },
            '2': { ldk: 2 },
            '3': { ldk: 3 },
            '4': { ldk: 4 },
            '5': { ldk: 5 },
            '6': { ldk: 6 },
            '7': { ldk: 7 },
            '8': { ldk: 8 },
            '9': { ldk: 9 },
            '10': { ldk: 10 },
            'N/A': { ldk: 0 }
        }
    },
    'How would you rate your Lab teacher 2  on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Dedication of teaching]': {
        type: 'radio',
        calc: 'lab-section lf2',
        options: {
            '1': { lfe: 1 },
            '2': { lfe: 2 },
            '3': { lfe: 3 },
            '4': { lfe: 4 },
            '5': { lfe: 5 },
            '6': { lfe: 6 },
            '7': { lfe: 7 },
            '8': { lfe: 8 },
            '9': { lfe: 9 },
            '10': { lfe: 10 },
            'N/A': { lfe: 0 }
        }
    },
    'How would you rate your Lab teacher 2  on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Helpfulness]': {
        type: 'radio',
        calc: 'lab-section lf2',
        options: {
            '1': { llx: 1 },
            '2': { llx: 2 },
            '3': { llx: 3 },
            '4': { llx: 4 },
            '5': { llx: 5 },
            '6': { llx: 6 },
            '7': { llx: 7 },
            '8': { llx: 8 },
            '9': { llx: 9 },
            '10': { llx: 10 },
            'N/A': { llx: 0 }
        }
    },
    'How would you rate your Lab teacher 2  on a scale on 1 (horrible) to 10 (outstanding) in the following criteria? [Knowledgeable about subject matter ]': {
        type: 'radio',
        calc: 'lab-section lf2',
        options: {
            '1': { ldk: 1 },
            '2': { ldk: 2 },
            '3': { ldk: 3 },
            '4': { ldk: 4 },
            '5': { ldk: 5 },
            '6': { ldk: 6 },
            '7': { ldk: 7 },
            '8': { ldk: 8 },
            '9': { ldk: 9 },
            '10': { ldk: 10 },
            'N/A': { ldk: 10 }
        }
    },
    'Was enough material presented in the course?': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'No.': { ca: 0, cq: 0 },
            'I don\'t know.': { ca: 0, cq: 0 },
            'A reasonable amount of content was taught.': { ca: 1, cq: 1 },
            'A lot of material was taught.  Students are getting their money\'s worth.': { ca: 2, cq: 2 },
        }
    },
    'Did the lectures adequately cover the syllabus?': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { ca: 1, cq: 1 },
            'No': { ca: 0, cq: 0 }
        }
    },
    'Were the lectures enough to learn the material?': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'No. I had to learn a lot from other places like YouTube.': { lq: -1, cq: -1, sp: 2 },
            'The lectures were fine for some topics, but for most topics they were inadequate': { lq: 0, cq: 0, sp: 1 },
            'The lectures were good.  I was able to learn most of the material from them.': { lq: 1, cq: 1, sp: 0 },
            'The lectures were outstanding.  I only needed to use other sources for more examples and get a deeper understanding.': { lq: 2, cq: 2, sp: 0 }
        }
    },
    'Answer the following for this course [Was problem-solving help provided for homework assignments?]': {
        type: 'radio',
        calc: 'course-section',
        options: {
            'Yes': { cq: 1, ae: 1 },
            'No': { cq: 0, ae: 0 },
            'Not relevant': { cq: 0, ae: 0 }
        }
    },
    'Answer the following for this course [Was enough homework and examples provided to learn the material?]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { cq: 2, ae: 1 },
            'No': { cq: -1, ae: 0 },
            'Not relevant': { cq: 0, ae: 0 }
        }
    },
    'Answer the following for this course [The projects assigned were relevant and did you receive adequate guidance?]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes': { cq: 1, ae: 1 },
            'No': { cq: -1, ae: -1 },
            'Not relevant': { cq: 0, ae: 0 }
        }
    },
    'Rate how the following learning activities helped you learn the subject matter.  Here 1  means: being no help and  means: 5 being most helpful [Video lectures]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { lq: 1, cq: 1 },
            '2': { lq: 2, cq: 2 },
            '3': { lq: 3, cq: 3 },
            '4': { lq: 4, cq: 4 },
            '5': { lq: 5, cq: 5 },
            'N/A': { lq: 0, cq: 0 }
        }
    },
    'Rate how the following learning activities helped you learn the subject matter.  Here 1  means: being no help and  means: 5 being most helpful [Online discussion classes]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { le: 1, cq: 1 },
            '2': { le: 2, cq: 2 },
            '3': { le: 3, cq: 3 },
            '4': { le: 4, cq: 4 },
            '5': { le: 5, cq: 5 },
            'N/A': { le: 0, cq: 0 }
        }
    },
    'Rate how the following learning activities helped you learn the subject matter.  Here 1  means: being no help and  means: 5 being most helpful [Bangla supplementary videos]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { ca: 1, cq: 1 },
            '2': { ca: 2, cq: 2 },
            '3': { ca: 3, cq: 3 },
            '4': { ca: 4, cq: 4 },
            '5': { ca: 5, cq: 5 },
            'N/A': { ca: 0, cq: 0 }
        }
    },
    'Rate how the following learning activities helped you learn the subject matter.  Here 1  means: being no help and  means: 5 being most helpful [Homework and problem solving tasks]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { ca: 1, cq: 1 },
            '2': { ca: 2, cq: 2 },
            '3': { ca: 3, cq: 3 },
            '4': { ca: 4, cq: 4 },
            '5': { ca: 5, cq: 5 },
            'N/A': { ca: 0, cq: 0 }
        }
    },
    'Rate how the following learning activities helped you learn the subject matter.  Here 1  means: being no help and  means: 5 being most helpful [Ungraded quizzes ]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            '1': { ca: 1, cq: 1 },
            '2': { ca: 2, cq: 2 },
            '3': { ca: 3, cq: 3 },
            '4': { ca: 4, cq: 4 },
            '5': { ca: 5, cq: 5 },
            'N/A': { ca: 0, cq: 0 }
        }
    },
    'Were the exams and assignments interesting?  [Exams questions were]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Too straight forward and easy': { cq: -1, ae: -1, sp: 0 },
            'Somewhat interesting': { cq: 1, ae: 1, sp: 0 },
            'Balanced, having both easy and conceptual content.': { cq: 2, ae: 2, sp: 0 },
            'Very hard and not relevant to course content.': { cq: -1, ae: 1, sp: 1}
        }
    },
    'Were the exams and assignments interesting?  [Assignments were]': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Too straight forward and easy': { cq: -1, ae: -1, sp: 0 },
            'Somewhat interesting': { cq: 1, ae: 1, sp: 0 },
            'Balanced, having both easy and conceptual content.': { cq: 2, ae: 2, sp: 0 },
            'Very hard and not relevant to course content.': { cq: -1, ae: 1, sp: 1}
        }
    },
    'Did you have to memorize a lot for the exams?': {
        type: 'radio',
        calc: 'course-section qAg',
        options: {
            'Yes. I had to memorize all the slides': { cq: -1 },
            'Yes.  There were no slides. But, I had to memorize all the content.': { cq: -2 },
            'Partially Yes. I had to memorize lots, but not everything.': { cq: 1 },
            'No. The exams tested understanding rather than memorization': { cq: 2 },
            'No. The exams were assignment based.': { cq: 1 },
        }
    },
    'How would you rate this course on a scale on 1 to 10?': {
        type: 'radio',
        calc: 'course-section',
        options: {
            '1': { cr: 1 },
            '2': { cr: 2 },
            '3': { cr: 3 },
            '4': { cr: 4 },
            '5': { cr: 5 },
            '6': { cr: 6 },
            '7': { cr: 7 },
            '8': { cr: 8 },
            '9': { cr: 9 },
            '10': { cr: 10 },
        }
    },
    'Please describe the good things about how this course was taught.': {
        type: 'text',
        calc: 'non-eval',
    },
    'Please describe the teaching methods used in this course and course administration that you think need improvement. ': {
        type: 'text',
        calc: 'non-eval',
    },
    'Please give your opinion on how to use technology better. Please suggest the best combination of digital platforms to be used for smooth communication between students and teachers, administration of the course, and online lectures.': {
        type: 'text',
        calc: 'non-eval',
    },
    'Were any of the standard guidelines for online courses broken by this course?  For example, one guideline is that attendance should not be taken in live classes. ': {
        type: 'text',
        calc: 'non-eval',
    },
    'Please provide comments on your section teacher. ': {
        type: 'text',
        calc: 'non-eval',
    },
    'How would you improve this course?': {
        type: 'text',
        calc: 'non-eval',
    },
    'If there was a lab component, how would you improve the lab part of the course?': {
        type: 'text',
        calc: 'non-eval',
    },
};

const labCourses = [
    "CSE101", "CSE110", "CSE111", "CSE220", "CSE221", "CSE250", "CSE251", "CSE260", "CSE310",
    "CSE321", "CSE330", "CSE341", "CSE350", "CSE360", "CSE370", "CSE391", "CSE419", "CSE420",
    "CSE421", "CSE422", "CSE423", "CSE430", "CSE460", "CSE461", "CSE471", "CSE474", "CSE490",
    "CSE491", "EEE362"
]
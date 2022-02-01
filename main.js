let url = `https://jservice.io/api`;

// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {

    const res = await axios.get(`${url+'/categories'}`, {
        params: {
            count: '100'
        }
    })
    let result = [];
    try {
        let i = 0;
        while (i < 7) {
            let idx = Math.floor(Math.random() * 100);
            if(!result.includes(res.data[idx].id)){
                result.push(res.data[idx].id)
                i++
            }
        }
        return result
    } catch (e) {
        return e
    }

}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {

    const res = await axios.get(`${url+'/clues'}`, {
        params: {
            category: `${catId}`
        }
    })



    let clues = res.data.map((x) => {
        return {
            question: x.question,
            answer: x.answer,
            showing: null
        }
    })
    return {
        title: `${res.data[0].category.title}`,
        clue: clues,
    }
}


/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {

    let $tr = $('<tr>');
    
    for (let i = 0; i < 6; i++) {
        let $tr = $("<tr>");
        for (let j = 0; j < 5; j++) {
            $tr.append(`<td id="${i}-${j}"class="question"></td>`)

        }
        $('tbody').append($tr)
    }
    $('button').on('click', showLoadingView)


}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let q = evt.target.id[0];
    let cat = evt.target.id[2];
    if(q===undefined){
        throw Error('Hmm Try again. Click away from the question mark')
    }
    console.log(q, cat)
    let clue = categories[cat].clue[q];
    if (clue.showing == "question") {
        $(`#${q}-${cat}`).text(`${clue.answer}`)

    }
    if (clue.showing === null) {
        $(`#${q}-${cat}`).html(`${clue.question}`)
        clue.showing = "question";
    }

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    categories = [];
    $('thead tr').remove();
    $('tbody td').remove()
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    console.log(`setupAndStart`)

    let ids = await getCategoryIds();

    for (let id of ids) {
        categories.push(await getCategory(id))
    }
    fillTable()
    console.log(`click`)
    
}

/** On click of start / restart button, set up game. */
// TODO
$(window).on('load', setupAndStart)


/** On page load, add event handler for clicking clues */
$('tbody').on('click', handleClick)
// TODO
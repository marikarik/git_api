const page = document.querySelector('.page')
const main = createElement('main')
const wrap = createElement('div', 'wrap')
const input = createElement('input', 'search-input')
const listFoundRepositories = createElement('ul', 'listRepo')
const listSelectedRepositories = createElement('ul', 'listSelectedRepositories')

page.append(main)
main.append(wrap)
wrap.append(input)
wrap.append(listFoundRepositories)
wrap.append(listSelectedRepositories)

let dataRepositories 

function createElement(tag, classAdd) {
    const element = document.createElement(tag)
    if(classAdd){
        element.classList.add(classAdd)
    }
     return element
}

async function searchRepo(query) {
    if(query.length === 0 || query.trim().length === 0) return
    try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`)
    const responseJson = await response.json()
    if(responseJson.items.length < 5){
        dataRepositories = responseJson.items
        return responseJson.items
    } else {
        dataRepositories = responseJson.items.slice(0, 5)
        return responseJson.items.slice(0, 5)
    }
    }
    catch(err) {
        console.log(err);
    }

}

async function inputHandler (event) {
    const query = event.target.value
    debounceInput(query)
}
input.addEventListener('input', inputHandler)


function repoAddInList(repositories) {
    listFoundRepositories.innerHTML = ''
    repositories.forEach(item => {
        const repo = createElement('li', 'repo')
        repo.textContent = item.name
        listFoundRepositories.append(repo)
    });

}

function clearInput () {
    input.removeEventListener('input', inputHandler)
    input.value = ''
    input.addEventListener('input', inputHandler)
}


listFoundRepositories.addEventListener('click', (event) => {
    clearInput ()
    if(event.target.closest('.repo')){
        const clickItem = event.target
        const repoName = clickItem.textContent
        for(let repo of dataRepositories) {
            if(repo.name === repoName) {
                const selectedRepo = createElement('li', 'selectedRepo')
                const infoRepoWrap = createElement('div', 'infoRepoWrap')
                selectedRepo.append(infoRepoWrap)
                listSelectedRepositories.append(selectedRepo)
                infoRepoWrap.insertAdjacentHTML('afterbegin', `
                    <span>Name: ${repo.name}</span>
                    <span>Owner: ${repo.owner.login}</span>
                    <span>Stars: ${repo.stargazers_count}</span>
                    `)
                const buttonClose = createElement('button', 'buttonClose')
                const buttonImg = createElement('img')
                selectedRepo.append(buttonClose)
                buttonClose.append(buttonImg)
                buttonImg.src = 'cross.svg'
            }
        }  
    }
})

listSelectedRepositories.addEventListener('click', (event) => {
    if(event.target.closest('.buttonClose ')) {
        const removeRepo = event.target.closest('.selectedRepo')
        removeRepo.remove()
    }
})

const debounce = (fn, debounceTime) => {
    let timeOut  
     return function (...args) {
        clearTimeout(timeOut)
        const funlCall = async () => {
            const dataRepo = await fn.apply(this, args)
            repoAddInList(dataRepo)
            }
        timeOut = setTimeout(funlCall, debounceTime)
        }     
}

const debounceInput = debounce(searchRepo, 350)





// searchRepo('mari')

// class page {
//     constructor() {
//         this.page = document.querySelector('.page')
//         this.main = this.createElement('main')
//         this.wrap = this.createElement('div', 'wrap')
//         this.input = this.createElement('input', 'search-input')
//         this.list = this.createElement('ul', 'list_repo')
//         // this.repoSearched = this.createElement('li', 'repo')

//         this.page.append(this.main)
//         this.main.append(this.wrap)
//         this.wrap.append(this.input)
//         this.wrap.append(this.list)
//         // this.list.append(this.repoSearched)

//         this.searchRepo = searchRepo.bind(this)
//         this.debounceGetValueInput = debounce(this.getValueInput.bind(this), 400)

//         this.input.addEventListener('input', this.debounceGetValueInput)
//     }

    
//     createElement(tag, classAdd) {
//         const element = document.createElement(tag)
//         if(classAdd){
//             element.classList.add(classAdd)
//         }
//         return element
//     }

//     addRepoInList(repos) {
//         repos.forEach(repo => {
            
//         });
//     }
//     getValueInput() {
        
//         const query = this.input.value;
//         this.searchRepo(query)

//     }
// }

// // console.log(app);
// // const input = document.querySelector('.search-input')


// function searchRepo(query) {
//     console.log(query);
//     if(query.length === 0 || query.trim().length === 0){
//         return
//     }
//     return fetch(`https://api.github.com/search/repositories?q=${query}`)
//     .then(response => response.json())
//     .then(listRepo => {
//         if(listRepo.items.length < 5){
//             return listRepo.items
//         } else {
//             return listRepo.items.slice(0, 5)
//         }
//     })

// }
// // searchRepo('mari')
// //     .then( result => console.log(result))



// const debounce = (fn, debounceTime) => {
//     let timeOut 
    
//             return function (...args) {
//                     clearTimeout(timeOut)
//                     const funlCall = () => {
//                         fn.apply(this, args)
//                     }
//                     timeOut = setTimeout(funlCall, debounceTime)
//             }
    
//     }

//     new page()

const API_KEY= '54904bbb10523f44f6936afadd9009c6';
const url= 'https://api.themoviedb.org/3/search/movie?api_key=54904bbb10523f44f6936afadd9009c6';
const imageurl= 'https://image.tmdb.org/t/p/w500';


const buttonelement =document.querySelector('#search');
const inputelement =document.querySelector('#inputValue');
const moviesSearchable =document.querySelector('#movies-searchable');

function generateurl(path){
    const url=`https://api.themoviedb.org/3${path}?api_key=54904bbb10523f44f6936afadd9009c6`;
    return url;
}



function movieSection(movies){
    return movies.map((movie) =>{
        if(movie.poster_path){
        return `<img 
        src= ${imageurl+movie.poster_path}  
        data-movie-id=${movie.id}
        />`;}
    })
}

function rendersearchmovies(data){

    moviesSearchable.innerHTML='';
    const movies= data.results;
    const movieBlock= createmoviecontainer(movies);
    moviesSearchable.appendChild(movieBlock);
    console.log('data:   ', data);

}

function createmoviecontainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class' , 'movie');

    const movieTemplate= `
    <section class="section">
        ${
            movieSection(movies)
        }
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;

    movieElement.innerHTML= movieTemplate;
    return movieElement;
}


buttonelement.onclick= function(event){
    event.preventDefault();
    const value= inputelement.value;
    const path= '/search/movie';
    
    const newurl= generateurl(path)+ '&query='+ value;

    fetch(newurl)
        .then((res) => res.json())
        .then(rendersearchmovies)
        .catch((error) => {
            console.log('error:   ',error);
        });

inputelement.value='';
    
}


function createIframe(video){
    const iframe= document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width= 200;
    iframe.height=200;
    iframe.allowFullscreen = true;

    return iframe;
}
function createvideoTemplate(data,content){

    content.innerHTML= '<p id="content-close">X(close)</p><br><p id="detail">Videos for your movie...</p>';
    console.log('videos:    ',data);
            const videos = data.results;
            const length= videos.length;
            const iframecontainer= document.createElement('div');

            for(let i = 0 ; i < length; i++)
            {
                const video = videos[i];
                const iframe = createIframe(video);
                iframecontainer.appendChild(iframe);
                content.appendChild(iframecontainer);
            }
}
 
document.onclick=function(event){
    const target= event.target;

    if(target.tagName.toLowerCase() === 'img'){
        const movieId= target.dataset.movieId;
        console.log('movie id :     ',movieId);
        const section= event.target.parentElement;
        const content= section.nextElementSibling;
        content.classList.add('content-display');

        const path= `/movie/${movieId}/videos`;
        const url = generateurl(path);

        fetch(url)
        .then((res) => res.json())
        .then((data) => createvideoTemplate(data, content)) 
        .catch((error) => {
            console.log('error:   ',error);
        });


    }

    if(target.id === 'content-close'){
        const content= target.parentElement;
        content.classList.remove('content-display');
    }
}
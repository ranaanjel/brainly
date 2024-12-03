export default function YTEmbed(props:{link:string}) {
    return <iframe width="100%" src={props.link} onLoad={function(){
        console.log("loaded iframe")}} title="YouTube video player"  allow="accelerometer; ahttps://www.youtube.com/watch?v=Zcjh68x9kOcutoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen ></iframe>
}

export function InputComponent({type,changeHandler, placeholder, reference}:{type?:string,changeHandler?:()=> void, placeholder:string, reference:any}) {

    return <div>
        <input type={type} ref={reference} className="py-2 px-4 border rounded border-slate-800 " onChange={changeHandler} placeholder={placeholder}/>
    </div>
}
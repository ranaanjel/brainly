
export function InputComponent({changeHandler, placeholder, reference}:{changeHandler?:()=> void, placeholder:string, reference:any}) {

    return <div>
        <input type="text" ref={reference} className="py-2 px-4 border rounded border-slate-800 " onChange={changeHandler} placeholder={placeholder}/>
    </div>
}
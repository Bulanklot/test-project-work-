import {Tabs} from "antd";
import {converterTabItems} from "./TabItems.jsx";

export const ConverterPage = () =>{
return (
<div style={{padding: '20px', fontSize: '20px', fontWeight: 700, minHeight:"100vh"}}>
    <Tabs className="custom-tabs" defaultActiveKey="1" items={converterTabItems} />
</div>
)
}
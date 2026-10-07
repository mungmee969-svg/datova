'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {Activity,CloudRain,Globe2,MapPin,Ship,TrendingUp,Newspaper,BrainCircuit,Radio,ArrowUpRight} from 'lucide-react';
type Quake={id:string;mag:number;place:string;time:number;url:string};
type Weather={current?:{temperature_2m:number;relative_humidity_2m:number;precipitation:number;wind_speed_10m:number}};
const countries=[{name:'ไทย',lat:13.75,lon:100.5,x:76,y:55},{name:'จีน',lat:39.9,lon:116.4,x:78,y:38},{name:'ญี่ปุ่น',lat:35.7,lon:139.7,x:87,y:43},{name:'สหรัฐฯ',lat:38.9,lon:-77,x:25,y:38},{name:'อังกฤษ',lat:51.5,lon:-.1,x:47,y:31},{name:'สิงคโปร์',lat:1.3,lon:103.8,x:77,y:64},{name:'อินเดีย',lat:28.6,lon:77.2,x:69,y:49},{name:'ออสเตรเลีย',lat:-33.9,lon:151.2,x:86,y:77}];
export default function Home(){
const [quakes,setQuakes]=useState<Quake[]>([]),[updated,setUpdated]=useState(''),[weather,setWeather]=useState<Weather|null>(null),[country,setCountry]=useState(countries[0]);
useEffect(()=>{fetch('/api/earthquakes',{cache:'no-store'}).then(r=>r.json()).then(d=>{setQuakes(d.events||[]);setUpdated(d.fetchedAt||'')}).catch(()=>{})},[]);
useEffect(()=>{fetch(`/api/weather?lat=${country.lat}&lon=${country.lon}`,{cache:'no-store'}).then(r=>r.json()).then(setWeather).catch(()=>setWeather(null))},[country]);
return <div className="dash">
<header className="topbar"><div><div className="eyebrow">WORLD DATA INTELLIGENCE</div><h1>Global Intelligence</h1><p>มองโลกแบบเชื่อมโยง • เห็นเหตุการณ์ • เข้าใจผลกระทบ • เตรียมพร้อมก่อนใคร</p></div><div className="livebadge"><i/> LIVE SOURCES <b>2</b></div></header>
<section className="command">
<div className="worldstage">
<div className="stagehead"><div><span className="kicker">GLOBAL SITUATION MAP</span><h2>โลกกำลังเกิดอะไรขึ้น <em>ตอนนี้</em></h2></div><Link href="/world" className="ghost">EXPLORE WORLD <ArrowUpRight size={14}/></Link></div>
<div className="worldmap hero-map"><div className="mapgrid"/><div className="mapglow"/><div className="mapland northamerica"/><div className="mapland southamerica"/><div className="mapland europe"/><div className="mapland asia"/><div className="mapland africa"/><div className="mapland australia"/>{countries.map(c=><button key={c.name} className={'mappoint '+(country.name===c.name?'current':'')} style={{left:c.x+'%',top:c.y+'%'}} onClick={()=>setCountry(c)} title={c.name}><span/><label>{c.name}</label></button>)}<div className="maplegend"><span><i className="cyan"/> ประเทศที่เลือก</span><span><i className="amber"/> จุดประเทศ</span></div></div>
</div>
<aside className="intelrail">
<div className="railtitle"><BrainCircuit size={17}/> DATOVA AI INTELLIGENCE</div>
<div className="aihero"><span>SELECTED COUNTRY</span><strong>{country.name}</strong><p>ระบบกำลังใช้ข้อมูลจริงที่เชื่อมต่อเพื่อสร้างภาพสถานการณ์ ไม่สร้างคำพยากรณ์ที่ไม่มีโมเดลรองรับ</p></div>
<div className="signal"><CloudRain/><div><span>WEATHER NOW</span><strong>{weather?.current?weather.current.temperature_2m+' °C':'กำลังเชื่อมข้อมูล'}</strong><small>{weather?.current?`ความชื้น ${weather.current.relative_humidity_2m}% • ฝน ${weather.current.precipitation} มม.`:'Open-Meteo'}</small></div></div>
<div className="signal"><Activity/><div><span>SEISMIC ACTIVITY</span><strong>{quakes.length||'—'} events</strong><small>USGS • 24 ชั่วโมงล่าสุด</small></div></div>
<div className="aistatus"><Radio size={15}/> Predictive Engine: <b>ยังไม่เปิด</b><small>รอ historical data + backtesting</small></div>
</aside>
</section>
<section className="streamgrid">
<Link href="/markets" className="streamcard"><div className="streamicon"><TrendingUp/></div><span>MARKETS</span><strong>ตลาด & เศรษฐกิจ</strong><p>FX • Gold • Stocks • Macro</p><small>รอ licensed live feed</small></Link>
<Link href="/trade" className="streamcard"><div className="streamicon"><Ship/></div><span>GLOBAL TRADE</span><strong>การค้า & โลจิสติกส์</strong><p>Import • Export • Shipping • Ports</p><small>เปิดหน้าวิเคราะห์การค้า</small></Link>
<Link href="/disaster" className="streamcard activefeed"><div className="streamicon"><CloudRain/></div><span>RISK MONITOR</span><strong>ภัยพิบัติ</strong><p>Earthquake • Weather • Flood</p><small>USGS + Open-Meteo เชื่อมแล้ว</small></Link>
<Link href="/news" className="streamcard"><div className="streamicon"><Newspaper/></div><span>WORLD SIGNALS</span><strong>ข่าว & เหตุการณ์โลก</strong><p>Economy • Geopolitics • Business</p><small>รอ news sources</small></Link>
</section>
<section className="lowergrid">
<div className="glasspanel"><div className="paneltop"><div><span className="kicker">VERIFIED PUBLIC FEED</span><h3>เหตุการณ์แผ่นดินไหวล่าสุด</h3></div><span className="timestamp">{updated?new Date(updated).toLocaleTimeString('th-TH',{timeZone:'Asia/Bangkok'}):'กำลังโหลด'}</span></div><div className="quakefeed">{quakes.slice(0,5).map(q=><a href={q.url} target="_blank" rel="noreferrer" key={q.id}><b>M {q.mag.toFixed(1)}</b><span>{q.place}</span><small>{new Date(q.time).toLocaleString('th-TH',{timeZone:'Asia/Bangkok'})}</small></a>)}</div></div>
<div className="glasspanel mission"><span className="kicker">DATOVA MISSION</span><h3>ไม่ใช่แค่ดูข้อมูล<br/><em>แต่ต้องรู้ว่า “กระทบเราอย่างไร”</em></h3><p>ขั้นต่อไป DATOVA จะเชื่อมข่าว ตลาด การค้า ภัยพิบัติ และข้อมูลธุรกิจของผู้ใช้เข้าด้วยกัน เพื่อสร้าง My Intelligence ที่ต่างกันสำหรับแต่ละคน</p><Link href="/my-dashboard">MY INTELLIGENCE <ArrowUpRight size={14}/></Link></div>
</section>
<footer>PUBLIC DATA • SOURCE ATTRIBUTION • FRESHNESS STATUS • NO FABRICATED LIVE DATA</footer>
</div>}
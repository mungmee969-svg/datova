import {NextRequest,NextResponse} from 'next/server';
export const dynamic='force-dynamic';
export async function GET(req:NextRequest){
 const lat=Number(req.nextUrl.searchParams.get('lat')),lon=Number(req.nextUrl.searchParams.get('lon'));
 if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)return NextResponse.json({error:'Invalid coordinates'},{status:400});
 try{const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`;
 const res=await fetch(url,{next:{revalidate:300},signal:AbortSignal.timeout(9000)});if(!res.ok)throw Error('upstream');const data=await res.json();return NextResponse.json({source:'Open-Meteo',sourceUrl:'https://open-meteo.com/',fetchedAt:new Date().toISOString(),observationTime:data.current?.time,timezone:data.timezone,current:data.current});}catch{return NextResponse.json({error:'Weather source unavailable',source:'Open-Meteo'},{status:503})}
}

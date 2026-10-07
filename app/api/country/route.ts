import {NextRequest,NextResponse} from 'next/server';
export const dynamic='force-dynamic';
export async function GET(req:NextRequest){const code=(req.nextUrl.searchParams.get('code')||'THA').toUpperCase();try{const [country,gdp,pop,trade]=await Promise.all([
fetch(`https://api.worldbank.org/v2/country/${code}?format=json`,{next:{revalidate:86400}}),
fetch(`https://api.worldbank.org/v2/country/${code}/indicator/NY.GDP.MKTP.CD?format=json&per_page=8`,{next:{revalidate:21600}}),
fetch(`https://api.worldbank.org/v2/country/${code}/indicator/SP.POP.TOTL?format=json&per_page=8`,{next:{revalidate:21600}}),
fetch(`https://api.worldbank.org/v2/country/${code}/indicator/NE.TRD.GNFS.ZS?format=json&per_page=8`,{next:{revalidate:21600}})
]);if(!country.ok||!gdp.ok||!pop.ok||!trade.ok)throw Error('upstream');const [cj,gj,pj,tj]=await Promise.all([country.json(),gdp.json(),pop.json(),trade.json()]);const latest=(x:any)=>x?.[1]?.find((v:any)=>v.value!==null);return NextResponse.json({source:'World Bank Indicators API',fetchedAt:new Date().toISOString(),country:cj?.[1]?.[0]||null,gdp:latest(gj),population:latest(pj),tradePctGdp:latest(tj)})}catch{return NextResponse.json({error:'world_bank_unavailable'},{status:503})}}
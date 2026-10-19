'use strict';
const campos=[['titular','Titular / Razón social'],['rut','RUT'],['banco','Banco'],['tipo','Tipo de cuenta'],['numero','Número de cuenta'],['correo','Correo']];
const cuenta=window.datosTransferencia;
const listo=campos.every(([k])=>typeof cuenta[k]==='string'&&cuenta[k].trim());
const boton=document.getElementById('copiar'),estado=document.getElementById('estado'),aviso=document.getElementById('confirmacion');let timer;
for(const [k,label] of campos){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');row.className='data-row';dt.textContent=label;dd.textContent=cuenta[k]||'Por confirmar';if(!cuenta[k])dd.className='pending';row.append(dt,dd);document.getElementById('datos').append(row);}
boton.disabled=!listo;if(listo)estado.textContent='';
function alternativa(texto){const t=document.createElement('textarea');t.value=texto;t.setAttribute('readonly','');t.style.cssText='position:fixed;opacity:0;font-size:16px;top:0;left:0';document.body.append(t);t.focus();t.select();t.setSelectionRange(0,texto.length);let ok;try{ok=document.execCommand('copy');}finally{t.remove();boton.focus();}if(!ok)throw Error('No se pudo copiar');}
function cerrar(){clearTimeout(timer);aviso.hidden=true;}
boton.addEventListener('click',async()=>{if(!listo)return;const texto=campos.map(([k])=>cuenta[k].trim()).join('\n');try{try{if(!navigator.clipboard?.writeText)throw Error();await navigator.clipboard.writeText(texto);}catch{alternativa(texto);}aviso.hidden=false;clearTimeout(timer);timer=setTimeout(cerrar,2500);estado.textContent='';}catch{estado.textContent='No se pudo copiar. Seleccione los datos para copiarlos manualmente.';}});
document.getElementById('cerrar').addEventListener('click',cerrar);aviso.addEventListener('click',e=>{if(e.target===aviso)cerrar();});document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrar();});

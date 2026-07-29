
const Q=window.JFE_QUESTIONS||[];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const KEY='jfe_fe_progress_v1';
let state=JSON.parse(localStorage.getItem(KEY)||'{}'); state.answers??={};state.stars??={};state.theme??='light';
let filter='all', list=[], idx=0;
const save=()=>{localStorage.setItem(KEY,JSON.stringify(state));updateStats();renderMap()};
const chapters=[...new Set(Q.map(q=>q.chapter))];
const sources=[...new Set(Q.flatMap(q=>q.source.split(',').map(x=>x.trim().split(' ')[0])).filter(Boolean))].sort();
$('#chapterSelect').innerHTML='<option value="all">Tất cả chương</option>'+chapters.map(c=>`<option>${esc(c)}</option>`).join('');
$('#sourceSelect').innerHTML+=[...sources].map(s=>`<option>${esc(s)}</option>`).join('');
document.body.classList.toggle('dark',state.theme==='dark'); $('#themeBtn').textContent=state.theme==='dark'?'☀️':'🌙';
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function status(q){const a=state.answers[q.id]; if(!a)return'unanswered';return a.correct?'correct':'wrong'}
function rebuild(keepId){const ch=$('#chapterSelect').value, src=$('#sourceSelect').value, term=$('#searchInput').value.trim().toLowerCase();
 list=Q.filter(q=>(ch==='all'||q.chapter===ch)&&(src==='all'||q.source.includes(src))&&(!term||String(q.id)===term||q.question.toLowerCase().includes(term)||q.source.toLowerCase().includes(term))&&(filter==='all'||filter==='starred'&&state.stars[q.id]||filter===status(q)));
 if($('#orderSelect').value==='random') list=[...list].sort(()=>Math.random()-.5); idx=Math.max(0,list.findIndex(q=>q.id===keepId)); if(idx<0)idx=0;render();}
function render(){if(!list.length){$('#questionText').innerHTML='<div class="empty">Không có câu hỏi phù hợp bộ lọc.</div>';$('#options').innerHTML='';$('#position').textContent='0 / 0';renderMap();updateStats();return}
 const q=list[idx]; const rec=state.answers[q.id]; $('#position').textContent=`Câu ${idx+1} / ${list.length} · ID ${q.id}`;$('#chapterBadge').textContent=q.chapter;$('#sourceBadge').textContent=q.source;$('#questionText').textContent=q.question;
 const has=Object.values(q.options).some(Boolean); $('#options').innerHTML=has?Object.entries(q.options).filter(([,v])=>v).map(([k,v])=>`<button class="option ${rec?.choice===k?'selected':''} ${rec?.checked&&k===q.answer?'correct':''} ${rec?.checked&&rec.choice===k&&k!==q.answer?'wrong':''}" data-choice="${k}"><span class="letter">${k}</span><span>${esc(v)}</span></button>`).join(''):'<div class="raw-options">Các lựa chọn nằm trong nội dung câu hỏi hoặc là hình ảnh trong đề gốc. Hãy chọn đáp án bằng các nút A–D bên dưới.<div class="actions">'+['A','B','C','D'].map(k=>`<button class="option ${rec?.choice===k?'selected':''} ${rec?.checked&&k===q.answer?'correct':''} ${rec?.checked&&rec.choice===k&&k!==q.answer?'wrong':''}" data-choice="${k}"><span class="letter">${k}</span></button>`).join('')+'</div></div>';
 $$('.option[data-choice]').forEach(b=>b.onclick=()=>{state.answers[q.id]={choice:b.dataset.choice,checked:false,correct:false};save();render()});
 $('#starBtn').textContent=state.stars[q.id]?'★':'☆';$('#starBtn').classList.toggle('starred',!!state.stars[q.id]);
 const box=$('#answerBox');box.classList.add('hidden');box.textContent='';updateStats();renderMap();}
function showAnswer(mark){if(!list.length)return;const q=list[idx],rec=state.answers[q.id]||{};if(mark&&!rec.choice){alert('Hãy chọn một đáp án trước.');return}if(mark){rec.checked=true;rec.correct=rec.choice===q.answer;state.answers[q.id]=rec;save();render()}
 const box=$('#answerBox');box.classList.remove('hidden');box.textContent=`Đáp án đúng: ${q.answer||'Chưa có'}${q.answerText?'\n'+q.answerText:''}\nNguồn: ${q.source}`;}
function updateStats(){const scope=Q.filter(q=>$('#chapterSelect').value==='all'||q.chapter===$('#chapterSelect').value);let done=0,correct=0,wrong=0;scope.forEach(q=>{const a=state.answers[q.id];if(a?.checked){done++;a.correct?correct++:wrong++}});$('#doneCount').textContent=done;$('#correctCount').textContent=correct;$('#wrongCount').textContent=wrong;$('#remainingCount').textContent=scope.length-done;$('#progressBar').style.width=(scope.length?done/scope.length*100:0)+'%'}
function renderMap(){const box=$('#questionMap');box.innerHTML=list.map((q,i)=>`<button data-i="${i}" class="${i===idx?'current ':''}${status(q)} ${state.stars[q.id]?'starred':''}" title="ID ${q.id}">${i+1}</button>`).join('');box.querySelectorAll('button').forEach(b=>b.onclick=()=>{idx=+b.dataset.i;render();scrollTo({top:0,behavior:'smooth'})});$('#mapSummary').textContent=`${list.length} câu`}
$('#prevBtn').onclick=()=>{if(list.length){idx=(idx-1+list.length)%list.length;render()}};$('#nextBtn').onclick=()=>{if(list.length){idx=(idx+1)%list.length;render()}};$('#checkBtn').onclick=()=>showAnswer(true);$('#showBtn').onclick=()=>showAnswer(false);$('#starBtn').onclick=()=>{if(!list.length)return;const id=list[idx].id;state.stars[id]=!state.stars[id];save();render()};
['chapterSelect','sourceSelect','orderSelect'].forEach(id=>$('#'+id).onchange=()=>rebuild(list[idx]?.id));$('#searchInput').oninput=()=>rebuild();$$('.filter-tabs button').forEach(b=>b.onclick=()=>{$$('.filter-tabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;rebuild()});
$('#resetBtn').onclick=()=>{if(confirm('Xóa toàn bộ tiến độ của bộ câu hỏi hiện tại?')){state.answers={};save();rebuild()}};
$('#themeBtn').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';document.body.classList.toggle('dark',state.theme==='dark');$('#themeBtn').textContent=state.theme==='dark'?'☀️':'🌙';save()};
$('#exportBtn').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='jfe-progress.json';a.click();URL.revokeObjectURL(a.href)};
$('#importInput').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state=JSON.parse(r.result);state.answers??={};state.stars??={};save();rebuild();alert('Đã nhập tiến độ.')}catch{alert('File tiến độ không hợp lệ.')}};r.readAsText(f)};
addEventListener('keydown',e=>{if(['INPUT','SELECT'].includes(document.activeElement.tagName))return;if(e.key==='ArrowLeft')$('#prevBtn').click();if(e.key==='ArrowRight')$('#nextBtn').click();if(['1','2','3','4'].includes(e.key)){const k=['A','B','C','D'][+e.key-1];document.querySelector(`.option[data-choice="${k}"]`)?.click()}if(e.key==='Enter')$('#checkBtn').click()});
rebuild();

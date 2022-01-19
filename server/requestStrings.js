export const kslpStr = 'select concat(\'2021_\', T_CODE) C_I, KIND1 DS from Z.ZI_DIAG_IB_LIST_ALL where kind like \'клинический заключительный (эпикриз)\'';

const excel = `select 
oms.fio, oms.patient, oms.c_i, oms.cod, oms.dds, oms.dr, oms.w, oms.s_pol, nvl(oms.sn_pol, '123456789012345') sn_pol, oms.in_date, oms.out_date, oms.org, oms.org_code, oms.final_code, oms.srv_code, oms.srv_name, oms.usl_date, oms.age, pol.c_t from (
select
oms.fio,
oms.patient,
oms.c_i,
oms.cod,
oms.dds,
oms.dr,
oms.w,
oms.s_pol,
oms.sn_pol,
oms.in_date,
oms.out_date,
oms.org,
oms.org_code,
oms.final_code,
nvl(oms.srv_code, null) as srv_code,
nvl(oms.srv_name, null) as srv_name,
oms.usl_date,
oms.age
from
(SELECT DISTINCT
st.fio,
vst.patient,
vst.c_i,
vst.cod,
vst.dds,
vst.dr,
vst.w,
vst.s_pol,
vst.sn_pol,
vst.in_date,
vst.out_date,
vst.org,
vst.org_code,
vst.final_code,
nvl(e.code, e.code1) srv_code,
nvl(e.fullname,e.name) srv_name,
trunc(r.r_date) usl_date,
vst.age
from st.ksg_list_v vst
inner join t_med_chrts ch on ch.id = vst.id
inner join st.oms_list_v st on st.patient = vst.patient
left join od_vorders r on r.chart_id = ch.id
left join od_vec_srvs e on r.r_service_id = e.id
WHERE 
vst.cod not like '200%'  and vst.channel not like 'Городская скорая помощь' and
r.status = 0 and
r.r_status = 1 and
e.stype in ('ST_DIAG', 'ST_OPER', 'ST_PROC')
ORDER BY c_i) oms,
queries qu
where lower(qu.title) = 'список оказанных услуг по иб' and trunc(oms.usl_date) between to_date(qu.value1,'dd.mm.yyyy') and to_date(qu.value2,'dd.mm.yyyy') 
union all
select
oms.fio,
oms.patient,
oms.c_i,
oms.cod,
oms.dds,
oms.dr,
oms.w,
oms.s_pol,
oms.sn_pol,
oms.in_date,
oms.out_date,
oms.org,
oms.org_code,
oms.final_code,
nvl(oms.srv_code, null) as srv_code,
nvl(oms.srv_name, null) as srv_name,
oms.usl_date,
oms.age
from
(SELECT DISTINCT
st.fio,
vst.patient,
vst.c_i,
nvl(vst.cod, '69090') as cod,
vst.dds,
vst.dr,
vst.w,
vst.s_pol,
vst.sn_pol,
vst.in_date,
vst.out_date,
vst.org,
vst.org_code,
vst.final_code,
nvl(e.code, e.code1) srv_code,
nvl(e.fullname,e.name) srv_name,
trunc(r.r_date) usl_date,
vst.age
from st.ksg_list_v vst
inner join t_med_chrts ch on ch.id = vst.id
inner join st.oms_list_v st on st.patient = vst.patient
left join od_vorders r on r.chart_id = ch.id
left join od_vec_srvs e on r.r_service_id = e.id
WHERE 
vst.cod is null  and vst.channel not like 'Городская скорая помощь' and
r.status = 0 and
r.r_status = 1 and
e.stype in ('ST_DIAG', 'ST_OPER', 'ST_PROC')
ORDER BY c_i) oms,
queries qu
where lower(qu.title) = 'список оказанных услуг по иб' and trunc(oms.usl_date) between to_date(qu.value1,'dd.mm.yyyy') and to_date(qu.value2,'dd.mm.yyyy') 
union all
select
oms.fio,
oms.patient,
oms.c_i,
oms.cod,
oms.dds,
oms.dr,
oms.w,
oms.s_pol,
oms.sn_pol,
oms.in_date,
oms.out_date,
oms.org,
oms.org_code,
oms.final_code,
nvl(oms.srv_code, null) as srv_code,
nvl(oms.srv_name, null) as srv_name,
oms.usl_date,
oms.age
from
(SELECT DISTINCT
st.fio,
vst.patient,
vst.c_i,
vst.cod,
vst.dds,
vst.dr,
vst.w,
vst.s_pol,
vst.sn_pol,
vst.in_date,
vst.out_date,
vst.org,
vst.org_code,
vst.final_code,
nvl(e.code1, e.code) srv_code,
nvl(e.fullname,e.name) srv_name,
trunc(r.r_date) usl_date,
vst.age
from st.ksg_list_v vst
inner join t_med_chrts ch on ch.id = vst.id
inner join st.oms_list_v st on st.patient = vst.patient
left join od_vorders r on r.chart_id = ch.id
left join od_vec_srvs e on r.r_service_id = e.id
WHERE 
vst.cod not like '200%'  and vst.channel not like 'Городская скорая помощь' and
r.status = 0 and
r.r_status = 1 and
e.stype in ('ST_DIAG', 'ST_OPER', 'ST_PROC')
ORDER BY c_i) oms,
queries qu
where lower(qu.title) = 'список оказанных услуг по иб' and trunc(oms.usl_date) between to_date(qu.value1,'dd.mm.yyyy') and to_date(qu.value2,'dd.mm.yyyy') 
union all
select
st.fio,
list.patient,
list.c_i,
list.cod,
list.dds,
list.dr,
list.w,
list.s_pol,
list.sn_pol,
list.in_date,
list.out_date,
list.org,
list.org_code,
list.final_code,
list.cod srv_code,
null srv_name,
null usl_date,
list.age
from st.ksg_list_v list
inner join st.oms_list_v st on st.patient = list.patient
where list.cod like '200%'
union all
select
st.fio,
list.patient,
list.c_i,
list.cod,
list.dds,
list.dr,
list.w,
list.s_pol,
list.sn_pol,
list.in_date,
list.out_date,
list.org,
list.org_code,
list.final_code,
list.cod srv_code,
null srv_name,
null usl_date,
list.age
from st.ksg_list_v list
inner join st.oms_list_v st on st.patient = list.patient
where list.cod not in ('200530', '200525', '200409', '200510') and  list.channel not like 'Городская скорая помощь'
) oms
inner join oms_pat_pol pol on oms.patient = pol.patient
`;

const doc = 'select * from oms_pat_doc doc inner join oms_pat_pol pol on doc.patient = pol.patient where pol.sn_pol is not null';
const pol = 'select * from oms_pat_pol where sn_pol is not null';
const adr = 'select * from oms_pat_adr adr inner join oms_pat_pol pol on adr.patient = pol.patient where pol.sn_pol is not null';
const pat = 'select * from oms_pat pat inner join oms_pat_pol pol on pat.patient = pol.patient where pol.sn_pol is not null';
const history = 'select * from oms_pat_mk mk inner join oms_pat_pol pol on mk.patient = pol.patient where pol.sn_pol is not null';
const amb = 'select * from oms_pat_srv srv inner join oms_pat_pol pol on srv.patient = pol.patient where pol.sn_pol is not null';
const move = `select move.fio_pat, move.patient, move.c_i, move.org_type, move.org_pat, move.cod_u, move.fio_sot, move.d_b, move.kind, move.dds, move.cod, move.prog, move.tip, move.d_type, move.mcod, move.code, move.result, move.h_pays, move.h_date 
from oms_pat_move move
inner join st.ksg_list list on list.patient = move.patient
where list.channel like 'Городская скорая помощь' and move.cod not in ('200530', '200409', '200510', '200525')`;
const talons = `select CONCAT(move.patient, move.c_i) AP_ID,
move.patient,
'4' AP_TYPE, 
talons.talon_num N_NAP,
list.in_date D_NAP,
move.dds DS_NAP,
'0371001' ORGAN
from voms_st move
inner join st.ksg_list list on list.patient = move.patient
left join smp_num smp on move.c_i = smp.c_i
left join a.t_smh_plans talons on talons.t_med_chrt_id = smp.med_id
where list.channel like 'Городская скорая помощь' and move.cod not in ('200530', '200409', '200510', '200525')`;

export const listOfOmsRequests = [
  { name: 'PO', req: pol },
  { name: 'AD', req: adr },
  { name: 'PA', req: pat },
  { name: 'DU', req: doc },
  { name: 'MU', req: amb },
  { name: 'MB', req: history },
];

const xml = `
select
oms.patient,
oms.id,
oms.c_i,
oms.cod,
oms.dds,
oms.dr,
oms.w,
oms.s_pol,
oms.sn_pol,
oms.in_date,
oms.out_date,
oms.org,
oms.org_code,
oms.final_code,
nvl(oms.srv_code, null) as srv_code,
nvl(oms.srv_name, null) as srv_name,
oms.usl_date,
oms.age,
oms.tal_num,
oms.tal_d
from
(SELECT DISTINCT
vst.patient,
vst.id,
vst.c_i,
vst.cod,
vst.dds,
vst.dr,
vst.w,
vst.s_pol,
vst.sn_pol,
vst.in_date,
vst.out_date,
vst.org,
vst.org_code,
vst.final_code,
nvl(e.code1, e.code) srv_code,
nvl(e.fullname,e.name) srv_name,
trunc(r.r_date) usl_date,
vst.age,
tal.talon_num as tal_num,
tal.talon_date as tal_d
from st.ksg_list_v vst
inner join t_med_chrts ch on ch.id = vst.id
inner join a.t_smh_plans tal on vst.id = tal.t_med_chrt_id
left join od_vorders r on r.chart_id = ch.id
left join od_vec_srvs e on r.r_service_id = e.id
WHERE 
vst.cod not like '200%'  and vst.channel not like 'Городская скорая помощь' and
r.status = 0 and
r.r_status = 1 and tal.talon_num is not null and
e.stype in ('ST_DIAG', 'ST_OPER', 'ST_PROC')
ORDER BY c_i) oms,
queries qu
where lower(qu.title) = 'список оказанных услуг по иб' and trunc(oms.usl_date) between to_date(qu.value1,'dd.mm.yyyy') and to_date(qu.value2,'dd.mm.yyyy')
union all
select
oms.patient,
oms.id,
oms.c_i,
oms.cod,
oms.dds,
oms.dr,
oms.w,
oms.s_pol,
oms.sn_pol,
oms.in_date,
oms.out_date,
oms.org,
oms.org_code,
oms.final_code,
nvl(oms.srv_code, null) as srv_code,
nvl(oms.srv_name, null) as srv_name,
oms.usl_date,
oms.age,
oms.tal_num,
oms.tal_d
from
(SELECT DISTINCT
vst.patient,
vst.id,
vst.c_i,
vst.cod,
vst.dds,
vst.dr,
vst.w,
vst.s_pol,
vst.sn_pol,
vst.in_date,
vst.out_date,
vst.org,
vst.org_code,
vst.final_code,
nvl(e.code, e.code1) srv_code,
nvl(e.fullname,e.name) srv_name,
trunc(r.r_date) usl_date,
vst.age,
tal.talon_num as tal_num,
tal.talon_date as tal_d
from st.ksg_list_v vst
inner join t_med_chrts ch on ch.id = vst.id
inner join a.t_smh_plans tal on vst.id = tal.t_med_chrt_id
left join od_vorders r on r.chart_id = ch.id
left join od_vec_srvs e on r.r_service_id = e.id
WHERE 
vst.cod not like '200%'  and vst.channel not like 'Городская скорая помощь' and
r.status = 0 and
r.r_status = 1 and tal.talon_num is not null and
e.stype in ('ST_DIAG', 'ST_OPER', 'ST_PROC')
ORDER BY c_i) oms,
queries qu
where lower(qu.title) = 'список оказанных услуг по иб' and trunc(oms.usl_date) between to_date(qu.value1,'dd.mm.yyyy') and to_date(qu.value2,'dd.mm.yyyy')
union all
select
oms.patient,
oms.id,
oms.c_i,
oms.cod,
oms.dds,
oms.dr,
oms.w,
oms.s_pol,
oms.sn_pol,
oms.in_date,
oms.out_date,
oms.org,
oms.org_code,
oms.final_code,
nvl(oms.srv_code, null) as srv_code,
nvl(oms.srv_name, null) as srv_name,
oms.usl_date,
oms.age,
oms.tal_num,
oms.tal_d
from
(SELECT DISTINCT
vst.patient,
vst.id,
vst.c_i,
nvl(vst.cod, '69070') as cod,
vst.dds,
vst.dr,
vst.w,
vst.s_pol,
vst.sn_pol,
vst.in_date,
vst.out_date,
vst.org,
vst.org_code,
vst.final_code,
nvl(e.code1, e.code) srv_code,
nvl(e.fullname,e.name) srv_name,
trunc(r.r_date) usl_date,
vst.age,
tal.talon_num as tal_num,
tal.talon_date as tal_d
from st.ksg_list_v vst
inner join t_med_chrts ch on ch.id = vst.id
inner join a.t_smh_plans tal on vst.id = tal.t_med_chrt_id
left join od_vorders r on r.chart_id = ch.id
left join od_vec_srvs e on r.r_service_id = e.id
WHERE 
vst.cod is null and vst.channel not like 'Городская скорая помощь' and
r.status = 0 and
r.r_status = 1 and tal.talon_num is not null and
e.stype in ('ST_DIAG', 'ST_OPER', 'ST_PROC')
ORDER BY c_i) oms,
queries qu
where lower(qu.title) = 'список оказанных услуг по иб' and trunc(oms.usl_date) between to_date(qu.value1,'dd.mm.yyyy') and to_date(qu.value2,'dd.mm.yyyy') 
union all
select
list.patient,
list.id,
list.c_i,
list.cod,
list.dds,
list.dr,
list.w,
list.s_pol,
list.sn_pol,
list.in_date,
list.out_date,
list.org,
list.org_code,
list.final_code,
list.cod srv_code,
null srv_name,
null usl_date,
list.age,
tal.talon_num as tal_num,
tal.talon_date as tal_d
from st.ksg_list_v list
inner join a.t_smh_plans tal on list.id = tal.t_med_chrt_id
where cod like '200%' and cod not in ('200530', '200525', '200409', '200510' ) and  list.channel not like 'Городская скорая помощь' and tal.talon_num is not null
union all
select
list.patient,
list.id,
list.c_i,
list.cod,
list.dds,
list.dr,
list.w,
list.s_pol,
list.sn_pol,
list.in_date,
list.out_date,
list.org,
list.org_code,
list.final_code,
list.cod srv_code,
null srv_name,
null usl_date,
list.age,
tal.talon_num as tal_num,
tal.talon_date as tal_d
from st.ksg_list_v list
inner join a.t_smh_plans tal on list.id = tal.t_med_chrt_id
where cod in ('200530', '200525', '200409', '200510') and tal.talon_num is not null
union all
select
oms.patient,
oms.id,
oms.c_i,
nvl(oms.cod, '69090') cod,
oms.dds,
oms.dr,
oms.w,
oms.s_pol,
oms.sn_pol,
oms.in_date,
oms.out_date,
oms.org,
oms.org_code,
oms.final_code,
null as srv_code,
null as srv_name,
null usl_date,
oms.age,
tal.talon_num as tal_num,
tal.talon_date as tal_d
from st.ksg_list_v oms
inner join a.t_smh_plans tal on oms.id = tal.t_med_chrt_id
where tal.talon_num is not null and oms.cod not like '%200' and oms.channel not like 'Городская скорая помощь'
`;

export const ffoms = {
  xml,
  excel,
};

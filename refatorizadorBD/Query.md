I'd like to create a simple app (preferrably in javascript) that takes a JSON file (tblRepairList.json) and refactors it into a new format.

Current JSON format:
{ "_id" : { "$oid" : "65671e2258333f103ac48019" }, "ID" : 19, "Maquina" : "OUTRA", "NumMaquina" : "01114236", "Marca" : "Helvi TIG 250 AC/DC", "OrdemReparacao" : 20102905, "Actualizada" : null, "Avaria1" : null, "Avaria2" : null, "Avaria3" : null, "Avaria4" : null, "Avaria5" : null, "Avaria6" : null, "Avaria7" : null, "Avaria8" : null, "Avaria9" : null, "Avaria10" : null, "Avaria11" : null, "Avaria12" : null, "Avaria13" : null, "Avaria14" : null, "Avaria15" : null, "Avaria16" : null, "Avaria17" : null, "Avaria18" : null, "Avaria19" : null, "Avaria20" : null, "Avaria21" : null, "Avaria22" : null, "Avaria23" : null, "Avaria24" : null, "Avaria25" : null, "Avaria26" : null, "Avaria27" : null, "Avaria28" : null, "Avaria29" : null, "Avaria30" : null, "Extra1" : null, "Extra2" : null, "Extra3" : null, "Observacoes" : "EUROTIG 250AC/DC. Testado a soldar. Durante os nossos testes de soldadura não se verificou qualquer defeito no fucionamento da máquina. Todos os parametros estão dentro dos valores recomendados.", "DataTime" : { "$date" : "2010-11-09T14:16:36.000+0000" }, "Acessorios" : null, "Tipo" : null, "ModeloElectrex" : null, "IntExt" : null, "Utilizador" : null, "Cliente" : null, "Link" : null, "LinkCheck" : null, "ModeloCheck" : null },


the application must 
- read tblRepairList.json from an "old" folder and write the new JSON files into a "new" folder
- create a new tblRepairList.json file
- make "_id" : { "$oid" : "65671e2258333f103ac48019" } into "_id" :  "65671e2258333f103ac48019"
- make "DataTime" : { "$date" : "2010-11-09T14:16:36.000+0000" } into "DataTime":  "2010-11-09T14:16:36.000+0000"
- find inconsistencies in $date values, throw an error and stop the operation if any are found
- create a new tblAvarias.json
- search every item in tblRepairList.json for different "Avaria(number)" and copy them to tblAvarias.json. 
- tblRepairList.json must turn their "Avaria" into an array variable that stores correspondant values from tblAvarias.json
- do the same for "Extra1" to "Extra3"
- do the same for "Cliente"
- do the same for "Maquina"
- seeing as these JSON files are to be used to create databases in mongoDB, they must be in the appropriate format/structure (name: value pairs) - namely tblAvarias.json and tblExtras.json, tblCliente.json, etcetera
- the new JSON files should have object notation (name:value pairs) to be used as mongoDB collections (for example tblAvarias.json should be [{"Avaria1":"Microcontrolador"},{...},{"Avaria30":"Filtro MS"}])
- tblRepairList.json should have pointers to other JSON files, like for example in "Avarias". Instead of saving the values themselves (I don't really know how one would do that, if you could please explain it to me, I'd appreciate it) - something one would do in SQL, but I'm not sure if it's needed, or good practice, to do it in noSQL
- The resulting new JSON files (with the exception of tblRepairList.json) should have their values properly ordered, if at all possible
- "Atualizada" field must be turned into boolean. "Sim" values must be turned into "true" while "Não" and "null" values must be turned into "false". 
- "Tipo" and "ModeloElectrex" must follow the same procedure as "Avaria"
- "ID", "ModeloCheck", "Link" and "LinkCheck" can be excluded
- "Acessorios" must turn "Não" and "null" into "Nenhum"
- in every JSON, every field must be sorted alphabetically by value and every field must contain identifiable names. For example, there cannot be two fields with "Avaria2".
- The order of refactoring must be:
   1 - Get all the values and sort them alphabetically
   2- Sequentially create names to pair with said values (for example, "Avaria1", "Avaria2", "Avaria3", and so on)
   3- Create JSON with ordered name:value pairs
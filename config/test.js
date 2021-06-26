/*-- informações na tabela do monitoramento 
ex.
{
  1. A pessoa escolhe departamento
  2. tabela com informações
    - por departamento
    - pessoas cadastradas nesse departamento
    - quantidade de avisos nesse departamento
    - ultimo aviso nesse departamento
}
*/
const cox = require('./connection.js')();


let query =`
SELECT COUNT(*) as funcionarios_departamento, 
FROM avisos
INNER JOIN funcionarios
ON avisos.funcionario_id = funcionarios.funcionario_id
INNER JOIN departamentos
ON funcionarios.departamento_id = departamentos.departamento_id
GROUP BY departamentos.departamento_nome
WHERE departamentos.departamento_id = '2'
`;

cox.query(query, function(e, r) {
if (e) throw e;

  console.log(r);

});

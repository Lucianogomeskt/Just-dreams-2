const express = require('express');
const { Progresso, Aluno, Turma, ProfessorTurma, AlunoTurma } = require('../models');
const { authenticateToken, requireProfessorOrSelf } = require('../middleware/auth');
const router = express.Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authenticateToken);

// Rota para consultar progresso do aluno
router.get('/:alunoId', requireProfessorOrSelf, async (req, res) => {
  try {
    const { alunoId } = req.params;

    // Verificar se o aluno existe
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) {
      return res.status(404).json({
        success: false,
        message: 'Aluno não encontrado'
      });
    }

    // Se for um professor, verificar se ele tem acesso ao aluno através de alguma turma
    if (req.user.tipo === 'professor') {
      const professorTemAcesso = await ProfessorTurma.findOne({
        where: {
          professor_id: req.user.id
        },
        include: [{
          model: Turma,
          as: 'turmas',
          include: [{
            model: Aluno,
            as: 'alunos',
            where: { id: alunoId }
          }]
        }]
      });

      if (!professorTemAcesso) {
        return res.status(403).json({
          success: false,
          message: 'Você não tem permissão para visualizar o progresso deste aluno'
        });
      }
    }

    // Buscar todos os progressos do aluno
    const progressos = await Progresso.findAll({
      where: { aluno_id: alunoId },
      include: [{
        model: Turma,
        as: 'turma',
        attributes: ['id', 'nome', 'codigo']
      }]
    });

    // Calcular progresso geral
    let progressoGeral = 0;
    let totalAtividades = 0;
    let atividadesConcluidas = 0;

    if (progressos.length > 0) {
      progressos.forEach(progresso => {
        totalAtividades += progresso.total_atividades || 0;
        atividadesConcluidas += progresso.atividades_concluidas || 0;
      });

      if (totalAtividades > 0) {
        progressoGeral = Math.round((atividadesConcluidas / totalAtividades) * 100);
      }
    }

    // Retornar resposta de sucesso
    res.status(200).json({
      success: true,
      message: 'Progresso consultado com sucesso',
      data: {
        aluno: {
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
          idade: aluno.idade
        },
        progresso_geral: {
          porcentagem: progressoGeral,
          atividades_concluidas: atividadesConcluidas,
          total_atividades: totalAtividades
        },
        progresso_por_turma: progressos.map(progresso => ({
          turma: {
            id: progresso.turma.id,
            nome: progresso.turma.nome,
            codigo: progresso.turma.codigo
          },
          porcentagem: progresso.conclusao,
          atividades_concluidas: progresso.atividades_concluidas,
          total_atividades: progresso.total_atividades,
          ultima_atividade: progresso.ultima_atividade
        }))
      }
    });

  } catch (error) {
    console.error('Erro na consulta do progresso:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;




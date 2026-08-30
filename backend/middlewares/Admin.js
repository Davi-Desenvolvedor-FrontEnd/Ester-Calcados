const admin = (req, res, next) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ 
        message: 'Usuário não autenticado' 
      });
    }

    if (req.usuario.cargo !== 'adm') {
      return res.status(403).json({ 
        message: 'Acesso negado. Permissão de administrador necessária.' 
      });
    }

    next();
  } catch (error) {
    console.error('Erro no middleware admin:', error);
    return res.status(500).json({ 
      message: 'Erro interno do servidor' 
    });
  }
};

export default admin;
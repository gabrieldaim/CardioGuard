

const authenticateUser = async (msg,email) => {
    if (msg.message == "Login Realizado com sucesso!"  || msg.mesage == "Usuário criado!"){
        const usuairo = await getUuidUser(email)
        const uuid = usuairo.usuário.uuid
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user_uuid', uuid);
        localStorage.setItem('user_email', email);
        console.log("localStorage criado com sucesso!")
        return true;
    }else if(msg.message == "Email ou senha incorretos!"){
      return "Email ou senha incorretos!"
    }else if(msg.mesage[0] == "(sqlite3.IntegrityError) UNIQUE constraint failed: users.email"){
      return "email já existente!"
    }else{
      return "Algo deu errado na criação do usuário"
    }

  };
  
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };
  
  const logoutUser = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user_uuid');
    localStorage.removeItem('user_email');
  };

  const getUuidUser =async (email) => {
    const formData = new FormData();
    formData.append('email', email);
    let url = 'http://127.0.0.1:5000/user';
  
    try {
      const response = await fetch(url, {
        method: 'post',
        body: formData
      });
  
      const jsonResult = await response.json();
      return jsonResult; // Retornar o resultado para quem chamou a função
    } catch (error) {
      console.error('Error:', error);
      // Tratar ou lançar novamente o erro, conforme necessário
      throw error;
    }
  }

  export { authenticateUser, isAuthenticated, logoutUser,getUuidUser };
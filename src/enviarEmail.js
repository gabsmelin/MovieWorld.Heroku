async function enviarEmail(para, assunto, mensagem) {
    const response = await sender.sendMail({
      from: '"TCC INSF" <juliogames590@gmail.com>',
      to: para, 
      subject: assunto,
      html: mensagem
    })
    return response;
  }
  
  
  export default enviarEmail;
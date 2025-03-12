const LastUpdatesSection = () => {
  return (
    <div className="h-full w-full border-l border-white/10 p-4">
      <h1 className="text-2xl">Últimas atualizações</h1>
      <div className="bg-primary-alert text-primary-dark mt-5 w-full rounded-lg p-3">
        <h3 className="text-lg font-semibold">Funções para ação</h3>
        <hr className="opacity-20" />
        <p className="mt-3">
          Foi adicionado funções que permite ao usuário criar, atualizar ou
          excluir suas senhas aqui na plataforma.
        </p>
        <span className="mt-3 text-xs font-light">12.03.2024</span>
      </div>
      <div className="bg-primary-alert text-primary-dark mt-5 w-full rounded-lg p-3">
        <h3 className="text-lg font-semibold">Tabela visual</h3>
        <hr className="opacity-20" />
        <p className="mt-3">
          Foi adicionado uma tabela para visualização das senhas na página de
          visão geral. Nesta tabela, o usuário será capaz de visualizar e editar
          suas senhas adicionadas.
        </p>
        <span className="mt-3 text-xs font-light">09.03.2024</span>
      </div>
    </div>
  );
};

export default LastUpdatesSection;

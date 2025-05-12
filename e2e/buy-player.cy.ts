describe('Fluxo de compra de jogador', () => {
  beforeEach(() => {
    // Visita a página inicial antes de cada teste
    cy.visit('/dashboard');
  });

  it('deve completar o fluxo de compra de um jogador', () => {
    // Verifica se a página inicial carregou corretamente
    cy.get('[data-testid="player-list"]').should('be.visible');
    
    // Guarda o orçamento inicial
    cy.get('h2').contains('Orçamento:').invoke('text').then((budgetText) => {
      const initialBudget = parseInt(budgetText.replace(/[^0-9]/g, ''));
      
      // Encontra o primeiro jogador disponível para compra
      cy.get('button').contains('Comprar').first().click();
      
      // Verifica se o orçamento diminuiu
      cy.get('h2').contains('Orçamento:').invoke('text').then((newBudgetText) => {
        const newBudget = parseInt(newBudgetText.replace(/[^0-9]/g, ''));
        expect(newBudget).to.be.lessThan(initialBudget);
      });
      
      // Verifica se o jogador não aparece mais na lista
      cy.get('p').contains('Pedro').should('not.exist');
      
      // Navega para a página do time
      cy.contains('Meu Time').click();
      
      // Verifica se o jogador aparece no time
      cy.get('[data-testid="my-team"]').should('be.visible');
      cy.get('button').contains('Remover').should('exist');
    });
  });

  it('deve testar a responsividade do menu', () => {
    // Verifica se o menu está visível em telas grandes
    cy.viewport('macbook-13');
    cy.get('nav').should('be.visible');
    
    // Verifica se o menu hamburguer aparece em telas pequenas
    cy.viewport('iphone-6');
    cy.get('button[aria-label="Toggle menu"]').should('be.visible');
    
    // Abre o menu mobile
    cy.get('button[aria-label="Toggle menu"]').click();
    cy.get('nav').should('be.visible');
    
    // Fecha o menu mobile
    cy.get('button[aria-label="Toggle menu"]').click();
    cy.get('nav').should('not.be.visible');
  });

  it('deve validar a navegação entre páginas', () => {
    // Verifica se os links de navegação funcionam
    cy.contains('Meu Time').click();
    cy.url().should('include', '/team');
    
    cy.contains('Ligas').click();
    cy.url().should('include', '/league');
    
    cy.contains('Dashboard').click();
    cy.url().should('include', '/dashboard');
  });
}); 
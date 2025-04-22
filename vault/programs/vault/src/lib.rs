use anchor_lang::prelude::*;

declare_id!("ER14oDWttESJLnKGb1xTqenvW9spNiP7XYKKX7Zn7nNG");

#[program]
pub mod vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

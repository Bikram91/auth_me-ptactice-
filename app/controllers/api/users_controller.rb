class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end

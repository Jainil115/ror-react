class Api::V1::ApprovedTeamsController < ApplicationController
  before_action :set_project
  before_action :set_approved_team, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /approved_teams
  # def index
  #   @approved_teams = ApprovedTeam.all

  #   render json: @approved_teams
  # end

  #Get /projects/:project_id/approved_teams
  def index
    @approved_teams = @project.approved_teams
    render json: @approved_teams
  end

  # GET /approved_teams/1
  def show
    render json: @approved_team
  end

  # POST /approved_teams
  def create
    @approved_team = ApprovedTeam.new(approved_team_params)

    if @approved_team.save
      render json: @approved_team, status: :created, location: @approved_team
    else
      render json: @approved_team.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/approved_teams
  def create
    @approved_team = @project.approved_teams.new(approved_team_params)
    if @approved_team.save
      render json: @approved_team, status: :created, location: api_v1_project_url(@approved_team)
    else
      render json: @approved_team.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /approved_teams/1
  def update
    if @approved_team.update(approved_team_params)
      render json: @approved_team
    else
      render json: @approved_team.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/approved_teams/:id
  def update
    if @approved_team.update(approved_team_params)
      render json: @approved_team
    else
      render json: @approved_team.errors, status: :unprocessable_entity
    end
  end


  # DELETE /approved_teams/1
  # DELETE /approved_teams/:project_id/approved_teams/:id
  def destroy
    @approved_team.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_approved_team
      @approved_team = ApprovedTeam.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def approved_team_params
      params.require(:approved_team).permit(:project_id, :number_of_resources, :role, :availability_percentage, :duration)
    end
end

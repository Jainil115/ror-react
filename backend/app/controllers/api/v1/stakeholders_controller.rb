class Api::V1::StakeholdersController < ApplicationController
  before_action :set_project
  before_action :set_stakeholder, only: %i[ show update destroy ]


  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /stakeholders
  # def index
  #   @stakeholders = Stakeholder.all

  #   render json: @stakeholders
  # end

  #Get /projects/:project_id/stakeholders
  def index
    @stakeholders = @project.stakeholders
    render json: @stakeholders
  end


  # GET /stakeholders/1
  def show
    render json: @stakeholder
  end

  # POST /stakeholders
  def create
    @stakeholder = Stakeholder.new(stakeholder_params)

    if @stakeholder.save
      render json: @stakeholder, status: :created, location: @stakeholder
    else
      render json: @stakeholder.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/stakeholders
  def create
    @stakeholder = @project.stakeholders.new(stakeholder_params)
    if @stakeholder.save
      render json: @stakeholder, status: :created, location: api_v1_project_url(@stakeholder)
    else
      render json: @stakeholder.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stakeholders/1
  def update
    if @stakeholder.update(stakeholder_params)
      render json: @stakeholder
    else
      render json: @stakeholder.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/stakeholders/:id
  def update
    if @stakeholder.update(stakeholder_params)
      render json: @stakeholder
    else
      render json: @stakeholder.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stakeholders/1
  # DELETE /projects/:project_id/stakeholders/:id
  def destroy
    @stakeholder.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stakeholder
      @stakeholder = Stakeholder.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def stakeholder_params
      params.require(:stakeholder).permit(:title, :name, :contact, :project_id)
    end
end

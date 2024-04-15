class Api::V1::VersionHistoriesController < ApplicationController
  before_action :set_project
  before_action :set_version_history, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end
  
  # GET /version_histories
  # def index
  #   @version_histories = VersionHistory.all

  #   render json: @version_histories
  # end
  #Get /projects/:project_id/version_histories
  def index
    @version_histories = @project.version_histories
    render json: @version_histories
  end

  # GET /version_histories/1
  def show
    render json: @version_history
  end

  # POST /version_histories
  def create
    @version_history = VersionHistory.new(version_history_params)

    if @version_history.save
      render json: @version_history, status: :created, location: @version_history
    else
      render json: @version_history.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/version_histories
  def create
    @version_history = @project.version_histories.new(version_history_params)

    if @version_history.save
      render json: @version_history, status: :created, location: api_v1_project_url(@version_history)
    else
      render json: @version_history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /version_histories/1
  def update
    if @version_history.update(version_history_params)
      render json: @version_history
    else
      render json: @version_history.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/version_histories/:id
  def update
    if @version_history.update(version_history_params)
      render json: @version_history
    else
      render json: @version_history.errors, status: :unprocessable_entity
    end
  end


  # DELETE /version_histories/1
  # DELETE /projects/:project_id/version_histories/:id
  def destroy
    @version_history.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_version_history
      @version_history = VersionHistory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def version_history_params
      params.require(:version_history).permit(:version_no, :version_type, :change, :reason, :created_by, :revision_date, :approve_date, :approved_by, :project_id)
    end
end

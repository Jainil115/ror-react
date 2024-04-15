class Api::V1::SprintDetailsController < ApplicationController
  before_action :set_project
  before_action :set_sprint_detail, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /sprint_details
  # def index
  #   @sprint_details = SprintDetail.all

  #   render json: @sprint_details
  # end

  #Get /projects/:project_id/sprint_details
  def index
    @sprint_details = @project.sprint_details
    render json: @sprint_details
  end

  # GET /sprint_details/1
  def show
    render json: @sprint_detail
  end

  # POST /sprint_details
  def create
    @sprint_detail = SprintDetail.new(sprint_detail_params)

    if @sprint_detail.save
      render json: @sprint_detail, status: :created, location: @sprint_detail
    else
      render json: @sprint_detail.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/sprint_details
  def create
    @sprint_detail = @project.sprint_details.new(sprint_detail_params)
    if @sprint_detail.save
      render json: @sprint_detail, status: :created, location: api_v1_project_url(@sprint_detail)
    else
      render json: @sprint_detail.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /sprint_details/1
  def update
    if @sprint_detail.update(sprint_detail_params)
      render json: @sprint_detail
    else
      render json: @sprint_detail.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/sprint_details/:id
  def update
    if @sprint_detail.update(sprint_detail_params)
      render json: @sprint_detail
    else
      render json: @sprint_detail.errors, status: :unprocessable_entity
    end
  end


  # DELETE /sprint_details/1
  # Delete /projects/:project_id/sprint_details/:id
  def destroy
    @sprint_detail.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sprint_detail
      @sprint_detail = SprintDetail.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def sprint_detail_params
      params.require(:sprint_detail).permit(:sprint, :start_date, :end_date, :status, :comments, :project_id)
    end
end





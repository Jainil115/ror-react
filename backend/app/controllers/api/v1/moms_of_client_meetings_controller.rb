class Api::V1::MomsOfClientMeetingsController < ApplicationController
  before_action :set_project
  before_action :set_moms_of_client_meeting, only: %i[ show update destroy ]

  def set_project
    @project = Project.find(params[:project_id])
  end

  # GET /moms_of_client_meetings
  # def index
  #   @moms_of_client_meetings = MomsOfClientMeeting.all

  #   render json: @moms_of_client_meetings
  # end

  #Get /projects/:project_id/moms_of_client_meetings
  def index
    @moms_of_client_meetings = @project.moms_of_client_meetings
    render json: @moms_of_client_meetings
  end

  # GET /moms_of_client_meetings/1
  def show
    render json: @moms_of_client_meeting
  end

  # POST /moms_of_client_meetings
  def create
    @moms_of_client_meeting = MomsOfClientMeeting.new(moms_of_client_meeting_params)

    if @moms_of_client_meeting.save
      render json: @moms_of_client_meeting, status: :created, location: @moms_of_client_meeting
    else
      render json: @moms_of_client_meeting.errors, status: :unprocessable_entity
    end
  end

  #POST /projects/:project_id/moms_of_client_meetings
  def create
    @moms_of_client_meeting = @project.moms_of_client_meetings.new(moms_of_client_meeting_params)
    if @moms_of_client_meeting.save
      render json: @moms_of_client_meeting, status: :created, location: api_v1_project_url(@moms_of_client_meeting)
    else
      render json: @moms_of_client_meeting.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /moms_of_client_meetings/1
  def update
    if @moms_of_client_meeting.update(moms_of_client_meeting_params)
      render json: @moms_of_client_meeting
    else
      render json: @moms_of_client_meeting.errors, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/moms_of_client_meetings/:id
  def update
    if @moms_of_client_meeting.update(moms_of_client_meeting_params)
      render json: @moms_of_client_meeting
    else
      render json: @moms_of_client_meeting.errors, status: :unprocessable_entity
    end
  end


  # DELETE /moms_of_client_meetings/1
  # DELETE /projects/:project_id/moms_of_client_meetings/:id
  def destroy
    @moms_of_client_meeting.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_moms_of_client_meeting
      @moms_of_client_meeting = MomsOfClientMeeting.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def moms_of_client_meeting_params
      params.require(:moms_of_client_meeting).permit(:date, :duration, :mom_link, :comments, :project_id)
    end
end

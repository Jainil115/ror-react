require "test_helper"

class MomsOfClientMeetingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @moms_of_client_meeting = moms_of_client_meetings(:one)
  end

  test "should get index" do
    get moms_of_client_meetings_url, as: :json
    assert_response :success
  end

  test "should create moms_of_client_meeting" do
    assert_difference("MomsOfClientMeeting.count") do
      post moms_of_client_meetings_url, params: { moms_of_client_meeting: { comments: @moms_of_client_meeting.comments, date: @moms_of_client_meeting.date, duration: @moms_of_client_meeting.duration, mom_link: @moms_of_client_meeting.mom_link, project_id: @moms_of_client_meeting.project_id } }, as: :json
    end

    assert_response :created
  end

  test "should show moms_of_client_meeting" do
    get moms_of_client_meeting_url(@moms_of_client_meeting), as: :json
    assert_response :success
  end

  test "should update moms_of_client_meeting" do
    patch moms_of_client_meeting_url(@moms_of_client_meeting), params: { moms_of_client_meeting: { comments: @moms_of_client_meeting.comments, date: @moms_of_client_meeting.date, duration: @moms_of_client_meeting.duration, mom_link: @moms_of_client_meeting.mom_link, project_id: @moms_of_client_meeting.project_id } }, as: :json
    assert_response :success
  end

  test "should destroy moms_of_client_meeting" do
    assert_difference("MomsOfClientMeeting.count", -1) do
      delete moms_of_client_meeting_url(@moms_of_client_meeting), as: :json
    end

    assert_response :no_content
  end
end
